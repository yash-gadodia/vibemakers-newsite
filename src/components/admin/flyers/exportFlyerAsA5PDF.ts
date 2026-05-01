import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const A5_WIDTH_MM = 148;
const A5_HEIGHT_MM = 210;

async function waitForImages(root: HTMLElement, timeoutMs = 5000): Promise<void> {
  const imgs = Array.from(root.querySelectorAll('img'));
  if (imgs.length === 0) return;

  const withTimeout = <T,>(p: Promise<T>) =>
    new Promise<T>((resolve) => {
      const t = window.setTimeout(() => resolve(undefined as unknown as T), timeoutMs);
      p.then((v) => {
        window.clearTimeout(t);
        resolve(v);
      }).catch(() => {
        window.clearTimeout(t);
        resolve(undefined as unknown as T);
      });
    });

  await withTimeout(
    Promise.all(
      imgs.map(
        (img) =>
          img.complete
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                img.onload = () => resolve();
                img.onerror = () => resolve();
              })
      )
    ).then(() => undefined)
  );
}

export async function exportFlyerAsA5PDF(elementId: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found:', elementId);
    return;
  }

  // Capture the actual flyer node (not the admin preview wrapper) and do it in an
  // isolated DOM tree so transforms/overflow on ancestors can't clip the render.
  const sourceNode =
    (element.querySelector('.print-flyer-container') as HTMLElement | null) ?? element;

  const captureHost = document.createElement('div');
  captureHost.setAttribute('data-flyer-capture-host', 'true');
  Object.assign(captureHost.style, {
    position: 'fixed',
    left: '-10000px',
    top: '0',
    overflow: 'visible',
    transform: 'none',
    background: '#ffffff',
    zIndex: '2147483647',
    pointerEvents: 'none',
  } as Partial<CSSStyleDeclaration>);

  const clone = sourceNode.cloneNode(true) as HTMLElement;
  Object.assign(clone.style, {
    transform: 'none',
    overflow: 'visible',
    margin: '0',
  } as Partial<CSSStyleDeclaration>);

  captureHost.appendChild(clone);
  document.body.appendChild(captureHost);

  try {
    // Ensure fonts/images are ready so html2canvas doesn't snapshot a half-render.
    await (document as unknown as { fonts?: { ready: Promise<void> } }).fonts?.ready?.catch(
      () => undefined
    );
    await waitForImages(clone);

    // Force layout recalculation to ensure clone is fully rendered
    clone.offsetHeight;

    const rect = clone.getBoundingClientRect();
    const width = Math.max(1, Math.ceil(rect.width));
    const height = Math.max(1, Math.ceil(rect.height));

    // Render the element to an image from the isolated clone (avoids clipping)
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width,
      height,
      windowWidth: width,
      windowHeight: height,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      onclone: (doc) => {
        doc.documentElement.style.overflow = 'visible';
        doc.body.style.overflow = 'visible';
        (doc.body.style as unknown as { transform?: string }).transform = 'none';
      },
    });

  // Create exact A5 PDF with no margins
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [A5_WIDTH_MM, A5_HEIGHT_MM],
    compress: true,
  });

  // Use JPEG to reduce file size and improve compatibility.
  const imgData = canvas.toDataURL('image/jpeg', 0.95);

  // Add image at 0,0 filling the entire A5 page (no margins)
  pdf.addImage(imgData, 'JPEG', 0, 0, A5_WIDTH_MM, A5_HEIGHT_MM);

  const dateString = new Date().toISOString().split('T')[0];
  const filename = `vibemakers-school-outreach-flyer-${dateString}.pdf`;

  // Blob download is more reliable than pdf.save() on some browsers.
  const blob = pdf.output('blob');
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
    URL.revokeObjectURL(url);
  } finally {
    captureHost.remove();
  }
}
