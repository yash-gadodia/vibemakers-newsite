import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SubmissionsTable from '@/components/admin/SubmissionsTable';
import ApiKeyManager from '@/components/admin/ApiKeyManager';
import AdminInvites from '@/components/admin/AdminInvites';
import { LogOut, Users, School, Trophy, Key, Loader2, FileImage, UserPlus } from 'lucide-react';
import AssetGenerator from '@/components/admin/AssetGenerator';

interface ParentInterestRow {
  id: string;
  parent_name: string;
  parent_email: string;
  student_name: string;
  student_age: string;
  programme_interest: string;
  message: string | null;
  enquiry_type: string | null;
  created_at: string;
}

interface SchoolEnquiryRow {
  id: string;
  contact_name: string;
  contact_email: string;
  contact_role: string;
  school_name: string | null;
  student_level: string | null;
  number_of_students: string | null;
  programme_objectives: string | null;
  timing_sessions: string | null;
  message: string | null;
  created_at: string;
}

interface HackathonWaitlistRow {
  id: string;
  name: string;
  email: string;
  school: string;
  age_group: string;
  parental_consent: boolean;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  const [parentInterest, setParentInterest] = useState<ParentInterestRow[]>([]);
  const [schoolEnquiries, setSchoolEnquiries] = useState<SchoolEnquiryRow[]>([]);
  const [hackathonWaitlist, setHackathonWaitlist] = useState<HackathonWaitlistRow[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!authLoading && user && !isAdmin) {
      navigate('/');
    }
  }, [isAdmin, authLoading, user, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchAllSubmissions();
    }
  }, [isAdmin]);

  const fetchAllSubmissions = async () => {
    setIsLoadingData(true);
    try {
      const [parentRes, schoolRes, hackathonRes] = await Promise.all([
        supabase.from('parent_interest').select('*').order('created_at', { ascending: false }),
        supabase.from('school_enquiries').select('*').order('created_at', { ascending: false }),
        supabase.from('hackathon_waitlist').select('*').order('created_at', { ascending: false }),
      ]);

      if (parentRes.data) setParentInterest(parentRes.data);
      if (schoolRes.data) setSchoolEnquiries(schoolRes.data);
      if (hackathonRes.data) setHackathonWaitlist(hackathonRes.data);
    } catch {
      // Fetch error — data will remain empty
    }
    setIsLoadingData(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const parentColumns = [
    { key: 'created_at', label: 'Date' },
    {
      key: 'enquiry_type',
      label: 'Type',
      render: (value: string | null) => (value === 'for_self' ? '👤 Adult' : '👨‍👩‍👧 Parent'),
    },
    { key: 'parent_name', label: 'Lead Name' },
    { key: 'parent_email', label: 'Email' },
    { key: 'student_name', label: 'Student Name' },
    { key: 'student_age', label: 'Age' },
    { key: 'programme_interest', label: 'Programme' },
    { key: 'message', label: 'Message' },
  ];

  const schoolColumns = [
    { key: 'created_at', label: 'Date' },
    { key: 'school_name', label: 'School' },
    { key: 'contact_name', label: 'Contact Name' },
    { key: 'contact_email', label: 'Email' },
    { key: 'contact_role', label: 'Role' },
    { key: 'message', label: 'Message' },
  ];

  const hackathonColumns = [
    { key: 'created_at', label: 'Date' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'school', label: 'School' },
    { key: 'age_group', label: 'Age Group' },
    {
      key: 'parental_consent',
      label: 'Consent',
      render: (value: boolean) => (value ? '✅' : '❌'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Parent Enquiries</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{parentInterest.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">School Enquiries</CardTitle>
              <School className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{schoolEnquiries.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hackathon Waitlist</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hackathonWaitlist.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="parents" className="space-y-4">
          <TabsList>
            <TabsTrigger value="parents">Parent Interest</TabsTrigger>
            <TabsTrigger value="schools">School Enquiries</TabsTrigger>
            <TabsTrigger value="hackathon">Hackathon Waitlist</TabsTrigger>
            <TabsTrigger value="assets" className="gap-2">
              <FileImage className="h-4 w-4" />
              Assets
            </TabsTrigger>
            <TabsTrigger value="apikeys" className="gap-2">
              <Key className="h-4 w-4" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="invites" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Invites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="parents">
            <Card>
              <CardHeader>
                <CardTitle>Parent Interest Submissions</CardTitle>
                <CardDescription>
                  All submissions from parents interested in programmes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SubmissionsTable
                  data={parentInterest as unknown as Record<string, unknown>[]}
                  columns={parentColumns}
                  isLoading={isLoadingData}
                  emptyMessage="No parent enquiries yet"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schools">
            <Card>
              <CardHeader>
                <CardTitle>School Enquiries</CardTitle>
                <CardDescription>
                  All enquiries from schools for partnerships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SubmissionsTable
                  data={schoolEnquiries as unknown as Record<string, unknown>[]}
                  columns={schoolColumns}
                  isLoading={isLoadingData}
                  emptyMessage="No school enquiries yet"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hackathon">
            <Card>
              <CardHeader>
                <CardTitle>Hackathon Waitlist</CardTitle>
                <CardDescription>
                  Students who signed up for the hackathon waitlist
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SubmissionsTable
                  data={hackathonWaitlist as unknown as Record<string, unknown>[]}
                  columns={hackathonColumns}
                  isLoading={isLoadingData}
                  emptyMessage="No hackathon signups yet"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assets">
            <Card>
              <CardHeader>
                <CardTitle>Asset Generator</CardTitle>
                <CardDescription>
                  Generate and download marketing materials, flyers, and resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AssetGenerator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invites">
            <AdminInvites />
          </TabsContent>

          <TabsContent value="apikeys">
            <Card>
              <CardHeader>
                <CardTitle>API Key Management</CardTitle>
                <CardDescription>
                  Manage API keys for blog integrations like Vorank
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ApiKeyManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
