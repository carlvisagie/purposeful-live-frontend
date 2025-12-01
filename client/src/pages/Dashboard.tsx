import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Activity, Bell, BookOpen, Calendar, Heart, TrendingUp, User } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { data: notifications } = trpc.notification.list.useQuery();
  const { data: sessions } = trpc.session.getUserSessions.useQuery();
  const { data: latestDiagnostic } = trpc.diagnostic.getLatest.useQuery();
  const { data: progressHistory } = trpc.progress.getHistory.useQuery();

  const unreadCount = notifications?.filter(n => !n.isRead).length || 0;
  const upcomingSessions = sessions?.filter(s => 
    s.status === 'booked' && new Date(s.startTime) > new Date()
  ) || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b bg-white dark:bg-slate-900">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">Purposeful Live</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-xs text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="text-sm">{user?.name || user?.email}</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {user?.name?.split(' ')[0] || 'there'}!</h1>
          <p className="text-muted-foreground mt-2">Here's your wellness overview</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Wellness Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{latestDiagnostic?.wellnessScore || '--'}</div>
              <p className="text-xs text-muted-foreground">Out of 100</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingSessions.length}</div>
              <p className="text-xs text-muted-foreground">Scheduled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sessions?.length || 0}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Resources</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Available</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Latest Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle>Latest Assessment</CardTitle>
                  <CardDescription>Your most recent wellness evaluation</CardDescription>
                </CardHeader>
                <CardContent>
                  {latestDiagnostic ? (
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium mb-2">Primary Concerns</div>
                        <div className="flex flex-wrap gap-2">
                          {JSON.parse(latestDiagnostic.primaryConcerns || '[]').map((concern: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                              {concern}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-2">Recommended Focus</div>
                        <div className="flex flex-wrap gap-2">
                          {JSON.parse(latestDiagnostic.recommendedFocusAreas || '[]').map((area: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/assessment">Take New Assessment</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No assessment taken yet</p>
                      <Button asChild>
                        <Link href="/assessment">Start Assessment</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upcoming Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled coaching sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingSessions.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingSessions.slice(0, 3).map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{new Date(session.startTime).toLocaleDateString()}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(session.startTime).toLocaleTimeString()} - {session.duration} min
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Join</Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/sessions">View All Sessions</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No upcoming sessions</p>
                      <Button asChild>
                        <Link href="/book-session">Book a Session</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle>All Sessions</CardTitle>
                <CardDescription>Your complete session history</CardDescription>
              </CardHeader>
              <CardContent>
                {sessions && sessions.length > 0 ? (
                  <div className="space-y-2">
                    {sessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">{new Date(session.startTime).toLocaleDateString()}</div>
                          <div className="text-sm text-muted-foreground">
                            {session.duration} minutes • {session.status}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No sessions yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>Your wellness journey over time</CardDescription>
              </CardHeader>
              <CardContent>
                {progressHistory && progressHistory.length > 0 ? (
                  <div className="space-y-4">
                    {progressHistory.map((record) => (
                      <div key={record.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{new Date(record.createdAt).toLocaleDateString()}</div>
                          <div className="text-2xl font-bold">{record.wellnessScore}</div>
                        </div>
                        {record.notes && (
                          <p className="text-sm text-muted-foreground">{record.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No progress records yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Resource Library</CardTitle>
                <CardDescription>Educational materials and tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Resource library coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
