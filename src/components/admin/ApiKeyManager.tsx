import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Copy, Trash2, Key, AlertTriangle } from "lucide-react";
import { format } from "date-fns";

interface ApiKey {
  id: string;
  name: string;
  expires_at: string | null;
  scopes: string[];
  last_used_at: string | null;
  created_at: string;
}

// Generate a secure random API key
function generateApiKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const prefix = 'vbm_';
  let key = prefix;
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

// Hash the API key
async function hashApiKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const ApiKeyManager = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyExpiry, setNewKeyExpiry] = useState("");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const fetchApiKeys = async () => {
    const { data, error } = await supabase
      .from("api_keys")
      .select("id, name, expires_at, scopes, last_used_at, created_at")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setApiKeys(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a name for the API key");
      return;
    }

    setCreating(true);
    
    try {
      const plainKey = generateApiKey();
      const keyHash = await hashApiKey(plainKey);

      const { error } = await supabase.from("api_keys").insert({
        name: newKeyName.trim(),
        key_hash: keyHash,
        expires_at: newKeyExpiry ? new Date(newKeyExpiry).toISOString() : null,
        scopes: ["blog:write"],
      });

      if (error) {
        toast.error("Failed to create API key");
        console.error(error);
        return;
      }

      setGeneratedKey(plainKey);
      toast.success("API key created successfully");
      fetchApiKeys();
    } catch (err) {
      toast.error("Failed to create API key");
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const handleCopyKey = async (key: string) => {
    await navigator.clipboard.writeText(key);
    toast.success("API key copied to clipboard");
  };

  const handleDeleteKey = async (id: string) => {
    const { error } = await supabase.from("api_keys").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete API key");
      return;
    }

    toast.success("API key deleted");
    fetchApiKeys();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setNewKeyName("");
    setNewKeyExpiry("");
    setGeneratedKey(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">API Keys</h3>
          <p className="text-sm text-muted-foreground">
            Manage API keys for external integrations like Vorank
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Generate New Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate New API Key</DialogTitle>
              <DialogDescription>
                Create a new API key for external services to publish blog posts.
              </DialogDescription>
            </DialogHeader>

            {!generatedKey ? (
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="keyName">Key Name</Label>
                  <Input
                    id="keyName"
                    placeholder="e.g., Vorank Integration"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keyExpiry">Expiration Date (Optional)</Label>
                  <Input
                    id="keyExpiry"
                    type="date"
                    value={newKeyExpiry}
                    onChange={(e) => setNewKeyExpiry(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <Button
                  onClick={handleCreateKey}
                  className="w-full"
                  disabled={creating}
                >
                  {creating ? "Creating..." : "Generate Key"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4 pt-4">
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium text-amber-800 dark:text-amber-200">
                        Save this key now!
                      </p>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        This is the only time you'll see this key. Copy it and store it securely.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    value={generatedKey}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopyKey(generatedKey)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <Button onClick={handleCloseDialog} className="w-full">
                  Done
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : apiKeys.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/50">
          <Key className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No API keys yet</p>
          <p className="text-sm text-muted-foreground">
            Generate a key to allow external services to publish blog posts
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell>
                    {format(new Date(key.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    {key.expires_at ? (
                      new Date(key.expires_at) < new Date() ? (
                        <Badge variant="destructive">Expired</Badge>
                      ) : (
                        format(new Date(key.expires_at), "MMM d, yyyy")
                      )
                    ) : (
                      <span className="text-muted-foreground">Never</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {key.last_used_at ? (
                      format(new Date(key.last_used_at), "MMM d, yyyy HH:mm")
                    ) : (
                      <span className="text-muted-foreground">Never</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteKey(key.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="rounded-lg border p-4 bg-muted/50">
        <h4 className="font-medium mb-2">Vorank Configuration</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Configure Vorank with the following settings:
        </p>
        <div className="space-y-2 font-mono text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">API Base URL:</span>
            <code className="bg-background px-2 py-1 rounded border">
              https://rtvlqgieeckkxdwjbnrh.supabase.co/functions/v1/receive-article
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() =>
                handleCopyKey(
                  "https://rtvlqgieeckkxdwjbnrh.supabase.co/functions/v1/receive-article"
                )
              }
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyManager;
