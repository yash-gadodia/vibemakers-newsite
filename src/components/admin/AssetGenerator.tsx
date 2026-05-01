import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Printer, Loader2, Presentation, Download, Palette } from 'lucide-react';
import SchoolOutreachFlyer from './flyers/SchoolOutreachFlyer';
import { usePrintFlyer } from './flyers/usePrintFlyer';
import { exportFlyerAsA5PDF } from './flyers/exportFlyerAsA5PDF';
import TeacherSlideDeck from './slides/TeacherSlideDeck';
import BrandGuidelineDeck from './slides/BrandGuidelineDeck';

type AssetType = 'flyer' | 'slides';

const ASSETS = [
  { id: 'school-outreach-flyer', name: 'School Outreach Flyer', type: 'flyer' as AssetType, component: SchoolOutreachFlyer },
  { id: 'teacher-presentation-deck', name: 'Teacher Presentation Deck', type: 'slides' as AssetType, component: TeacherSlideDeck },
  { id: 'brand-guideline-deck', name: 'Brand Guideline Deck', type: 'slides' as AssetType, component: BrandGuidelineDeck },
] as const;

const AssetGenerator = () => {
  const [selectedAsset, setSelectedAsset] = useState<string>('teacher-presentation-deck');
  const [isExporting, setIsExporting] = useState(false);
  const flyerRef = useRef<HTMLDivElement>(null);
  const { printFlyer } = usePrintFlyer();

  const selectedAssetConfig = ASSETS.find(a => a.id === selectedAsset);
  const isSlidesDeck = selectedAssetConfig?.type === 'slides';
  const isFlyer = selectedAssetConfig?.type === 'flyer';

  const handleExport = async () => {
    if (isFlyer) {
      setIsExporting(true);
      // Use programmatic A5 PDF export for flyers
      await exportFlyerAsA5PDF('flyer-preview');
      setIsExporting(false);
    } else {
      // Navigate to dedicated print page for slides (opens in new tab)
      window.open('/print-slides', '_blank');
    }
  };

  const SelectedComponent = selectedAssetConfig?.component || SchoolOutreachFlyer;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-xs">
          <Select value={selectedAsset} onValueChange={setSelectedAsset}>
            <SelectTrigger>
              <SelectValue placeholder="Select asset template" />
            </SelectTrigger>
            <SelectContent>
              {ASSETS.map((asset) => (
                <SelectItem key={asset.id} value={asset.id}>
                  <div className="flex items-center gap-2">
                    {asset.id === 'brand-guideline-deck' && <Palette className="h-4 w-4" />}
                    {asset.id === 'teacher-presentation-deck' && <Presentation className="h-4 w-4" />}
                    {asset.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleExport} disabled={isExporting}>
          {isExporting ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : isFlyer ? (
            <Download className="h-4 w-4 mr-2" />
          ) : (
            <Printer className="h-4 w-4 mr-2" />
          )}
          {isFlyer ? 'Download A5 PDF' : 'Save as PDF'}
        </Button>
      </div>

      {/* Preview */}
      <div className="border rounded-lg p-4 bg-muted/30">
        {isSlidesDeck ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Use arrow keys to navigate slides. Press F for fullscreen. Click "Save as PDF" to export all slides.
            </p>
            <div className="max-w-5xl mx-auto">
              <SelectedComponent />
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Click "Download A5 PDF" to export as an exact A5 document (148×210mm) with no margins.
            </p>
            <div id="flyer-preview" ref={flyerRef}>
              <SelectedComponent />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AssetGenerator;
