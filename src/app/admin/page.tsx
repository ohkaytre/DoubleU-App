"use client";

import React, { useState } from 'react';
import { SideNav } from '@/components/navigation/SideNav';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Users, 
  Settings, 
  Music, 
  Play, 
  TrendingUp, 
  Clock,
  Activity,
  Shield,
  Zap,
  Plus,
  Edit,
  Trash2,
  Globe,
  Save,
  Radio
} from 'lucide-react';
import { 
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { MOCK_TRACKS, MOCK_TOUR_DATES, MOCK_ALBUMS } from '@/lib/mock-data';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { toast } from '@/hooks/use-toast';

const chartData = [
  { name: 'Mon', streams: 4000 },
  { name: 'Tue', streams: 3000 },
  { name: 'Wed', streams: 5000 },
  { name: 'Thu', streams: 2780 },
  { name: 'Fri', streams: 6890 },
  { name: 'Sat', streams: 8390 },
  { name: 'Sun', streams: 9490 },
];

export default function AdminPortal() {
  const { config, updateConfig } = useSiteConfig();
  const [tracks, setTracks] = useState(MOCK_TRACKS);
  const [isAddingTrack, setIsAddingTrack] = useState(false);

  const [localConfig, setLocalConfig] = useState(config);

  const handleDeploy = () => {
    updateConfig(localConfig);
    toast({
      title: "Protocol Deployed",
      description: "Site configuration has been updated across all nodes.",
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background overflow-hidden">
      <SideNav />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-12 space-y-6 md:space-y-8 pb-32">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6 md:pb-8">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-4xl font-headline font-bold uppercase tracking-tight flex items-center gap-3">
              <Shield className="text-primary w-6 h-6 md:w-8 md:h-8" />
              Nexus <span className="text-primary italic">Command</span>
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 text-[10px] md:text-sm font-medium uppercase tracking-widest">
              <Activity className="w-3 h-3 text-green-500" /> System Status: Optimal
            </p>
          </div>
          <div className="flex gap-2 md:gap-3">
            <Button variant="outline" size="sm" className="flex-1 md:flex-none border-white/10 hover:bg-white/5 gap-2 text-[10px] md:text-xs" asChild>
              <a href="/" target="_blank"><Globe className="w-4 h-4" /> LIVE VIEW</a>
            </Button>
            <Button size="sm" className="flex-1 md:flex-none bg-primary text-background font-bold hover:bg-primary/90 neon-glow-orange gap-2 text-[10px] md:text-xs" onClick={handleDeploy}>
              <Save className="w-4 h-4" /> DEPLOY PROTOCOL
            </Button>
          </div>
        </header>

        <Tabs defaultValue="overview" className="space-y-6 md:space-y-8">
          <TabsList className="bg-card/50 border border-white/5 p-1 h-auto flex-wrap justify-start gap-1">
            <TabsTrigger value="overview" className="flex-1 md:flex-none data-[state=active]:bg-primary data-[state=active]:text-background font-bold px-4 md:px-6 py-2 uppercase tracking-widest text-[9px] md:text-[10px]">Overview</TabsTrigger>
            <TabsTrigger value="music" className="flex-1 md:flex-none data-[state=active]:bg-secondary data-[state=active]:text-background font-bold px-4 md:px-6 py-2 uppercase tracking-widest text-[9px] md:text-[10px]">Music</TabsTrigger>
            <TabsTrigger value="tour" className="flex-1 md:flex-none data-[state=active]:bg-accent data-[state=active]:text-background font-bold px-4 md:px-6 py-2 uppercase tracking-widest text-[9px] md:text-[10px]">Tour</TabsTrigger>
            <TabsTrigger value="settings" className="flex-1 md:flex-none data-[state=active]:bg-white/10 font-bold px-4 md:px-6 py-2 uppercase tracking-widest text-[9px] md:text-[10px]">Config</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: 'Members', value: '14.2K', icon: Users, color: 'text-primary' },
                { label: 'Pulses', value: '1.8M', icon: Radio, color: 'text-secondary' },
                { label: 'Nodes', value: '32', icon: Music, color: 'text-accent' },
                { label: 'Growth', value: '+24%', icon: TrendingUp, color: 'text-green-400' },
              ].map((stat) => (
                <Card key={stat.label} className="bg-card/50 border-white/5 group hover:border-primary/20 transition-all">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between mb-2 md:mb-4">
                      <div className={`p-1.5 md:p-2 rounded-lg bg-black/40 ${stat.color}`}>
                        <stat.icon className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <Badge variant="outline" className="hidden sm:inline-flex border-green-500/20 text-green-500 text-[8px] md:text-[10px] uppercase">Active</Badge>
                    </div>
                    <h3 className="text-[8px] md:text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{stat.label}</h3>
                    <p className="text-xl md:text-3xl font-headline font-bold mt-1 tracking-tight">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <Card className="lg:col-span-2 bg-card/30 border-white/5 p-4 md:p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg font-headline font-bold uppercase tracking-widest flex items-center gap-2">
                    <Zap className="text-secondary w-5 h-5" /> Stream Analysis
                  </h3>
                </div>
                <div className="h-[250px] md:h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorStreams" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: 'hsl(var(--secondary))', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="streams" stroke="hsl(var(--secondary))" strokeWidth={3} fillOpacity={1} fill="url(#colorStreams)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="bg-card/30 border-white/5 p-4 md:p-6">
                 <h3 className="text-base md:text-lg font-headline font-bold uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-2">
                   <Clock className="text-primary w-5 h-5" /> Event Log
                 </h3>
                 <div className="space-y-3 md:space-y-4">
                    {[
                      { event: 'Node Connected', meta: 'User_882', time: '1m' },
                      { event: 'Sold Out', meta: 'London Hub', time: '15m' },
                      { event: 'AI Insight', meta: 'Insight #442', time: '1h' },
                    ].map((log, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 animate-pulse shadow-[0_0_8px_rgba(255,95,31,0.5)]" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold uppercase truncate tracking-wide">{log.event}</p>
                          <p className="text-[8px] text-muted-foreground uppercase truncate">{log.meta}</p>
                        </div>
                        <span className="text-[8px] text-muted-foreground font-mono">{log.time}</span>
                      </div>
                    ))}
                 </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="music" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex justify-between items-center gap-4">
              <h3 className="text-xl md:text-2xl font-headline font-bold uppercase tracking-tight italic">Sonic Inventory</h3>
              <Dialog open={isAddingTrack} onOpenChange={setIsAddingTrack}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-secondary text-background font-bold hover:bg-secondary/90 shadow-lg shadow-secondary/20 h-10 md:h-12 px-4 md:px-6 text-[10px] md:text-xs">
                    <Plus className="w-4 h-4 mr-2" /> ADD SIGNAL
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-white/10 sm:max-w-[600px] w-[95vw] rounded-2xl overflow-hidden">
                  <DialogHeader>
                    <DialogTitle className="font-headline uppercase text-xl md:text-2xl">Upload Frequency</DialogTitle>
                    <DialogDescription className="uppercase text-[9px] md:text-[10px] tracking-widest font-bold text-muted-foreground">Define parameters for your next sonic transmission.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 md:space-y-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <Label className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest">Signal Name</Label>
                        <Input placeholder="Neon Dreams" className="bg-black/50 h-10 md:h-12 text-xs" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest">Node Path</Label>
                        <Select>
                          <SelectTrigger className="bg-black/50 h-10 md:h-12 text-xs">
                            <SelectValue placeholder="Select Album" />
                          </SelectTrigger>
                          <SelectContent className="bg-card">
                            {MOCK_ALBUMS.map(a => <SelectItem key={a.id} value={a.id}>{a.title}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest">Protocol Text (Lyrics)</Label>
                      <Textarea placeholder="Digital shadows..." className="bg-black/50 min-h-[120px] font-mono text-xs" />
                    </div>
                  </div>
                  <DialogFooter className="gap-2 flex-row justify-end">
                    <Button variant="ghost" size="sm" onClick={() => setIsAddingTrack(false)} className="uppercase text-[9px] md:text-[10px] font-bold">Abort</Button>
                    <Button size="sm" className="bg-secondary text-background font-bold h-10 md:h-12 px-4 md:px-8 text-[10px] md:text-xs" onClick={() => {
                      setIsAddingTrack(false);
                      toast({ title: "Signal Uploaded", description: "The new frequency is now propagating." });
                    }}>UPLOAD</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="bg-card/30 border-white/5 overflow-hidden rounded-2xl md:rounded-[2rem]">
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader className="bg-white/5">
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="text-muted-foreground uppercase text-[9px] md:text-[10px] font-bold py-4 md:py-6 px-4 md:px-8 tracking-widest whitespace-nowrap">Signal Name</TableHead>
                      <TableHead className="text-muted-foreground uppercase text-[9px] md:text-[10px] font-bold tracking-widest whitespace-nowrap">Status</TableHead>
                      <TableHead className="text-muted-foreground uppercase text-[9px] md:text-[10px] font-bold text-right tracking-widest px-4 md:px-8">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tracks.map((track) => (
                      <TableRow key={track.id} className="border-white/5 hover:bg-white/5 transition-all group">
                        <TableCell className="font-bold uppercase tracking-tight py-4 md:py-6 px-4 md:px-8 text-xs md:text-sm whitespace-nowrap">{track.title}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Badge className="bg-green-500/10 text-green-400 border border-green-500/20 text-[8px] md:text-[9px] uppercase font-bold tracking-widest px-2 py-0.5">Live</Badge>
                        </TableCell>
                        <TableCell className="text-right px-4 md:px-8 whitespace-nowrap">
                          <div className="flex justify-end gap-1 md:gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10 hover:bg-secondary/10 hover:text-secondary rounded-lg md:rounded-xl"><Edit className="w-3.5 h-3.5" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10 hover:bg-red-500/10 hover:text-red-500 rounded-lg md:rounded-xl"><Trash2 className="w-3.5 h-3.5" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-1 gap-6 md:gap-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <Card className="bg-card/40 border-white/5 p-6 md:p-8 space-y-6 md:space-y-8 rounded-2xl md:rounded-[2rem]">
                  <h3 className="text-lg md:text-xl font-headline font-bold uppercase flex items-center gap-3 italic">
                    <Zap className="text-primary w-5 h-5 md:w-6 md:h-6" /> Hero Protocol
                  </h3>
                  <div className="space-y-4 md:space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Command Headline</Label>
                      <Input 
                        value={localConfig.heroHeadline} 
                        onChange={(e) => setLocalConfig({...localConfig, heroHeadline: e.target.value})}
                        className="bg-black/50 border-white/10 font-headline uppercase text-lg md:text-2xl h-12 md:h-14" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Transmission Tagline</Label>
                      <Textarea 
                        value={localConfig.heroTagline} 
                        onChange={(e) => setLocalConfig({...localConfig, heroTagline: e.target.value})}
                        className="bg-black/50 border-white/10 min-h-[100px] text-xs md:text-sm leading-relaxed" 
                      />
                    </div>
                  </div>
                </Card>

                <Card className="bg-card/40 border-white/5 p-6 md:p-8 space-y-6 md:space-y-8 rounded-2xl md:rounded-[2rem]">
                  <h3 className="text-lg md:text-xl font-headline font-bold uppercase flex items-center gap-3 italic">
                    <Users className="text-secondary w-5 h-5 md:w-6 md:h-6" /> Identity Profile
                  </h3>
                  <div className="space-y-4 md:space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Historical Bio</Label>
                      <Textarea 
                        value={localConfig.artistBio} 
                        onChange={(e) => setLocalConfig({...localConfig, artistBio: e.target.value})}
                        className="bg-black/50 border-white/10 min-h-[100px] text-xs md:text-sm leading-relaxed" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Location Node</Label>
                      <Input 
                        value={localConfig.locationNode} 
                        onChange={(e) => setLocalConfig({...localConfig, locationNode: e.target.value})}
                        className="bg-black/50 border-white/10 h-12 md:h-14 text-xs" 
                      />
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="bg-card/40 border-white/5 p-6 md:p-8 space-y-6 md:space-y-8 rounded-2xl md:rounded-[2rem]">
                <h3 className="text-lg md:text-xl font-headline font-bold uppercase flex items-center gap-3 italic">
                  <Settings className="text-accent w-5 h-5 md:w-6 md:h-6" /> Parameters
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                  <div className="flex items-center justify-between p-4 md:p-6 rounded-xl md:rounded-[1.5rem] bg-black/40 border border-white/5">
                    <div className="space-y-1">
                      <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest">AI Insights</p>
                      <p className="text-[8px] md:text-[10px] text-muted-foreground uppercase">Neural engine</p>
                    </div>
                    <Switch 
                      checked={localConfig.aiInsightsEnabled} 
                      onCheckedChange={(checked) => setLocalConfig({...localConfig, aiInsightsEnabled: checked})} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 md:p-6 rounded-xl md:rounded-[1.5rem] bg-black/40 border border-white/5">
                    <div className="space-y-1">
                      <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Pre-Save</p>
                      <p className="text-[8px] md:text-[10px] text-muted-foreground uppercase">Member gate</p>
                    </div>
                    <Select 
                      value={localConfig.preSaveAccess} 
                      onValueChange={(val: any) => setLocalConfig({...localConfig, preSaveAccess: val})}
                    >
                      <SelectTrigger className="w-24 md:w-32 bg-transparent border-white/10 text-[8px] md:text-[10px] font-bold uppercase tracking-widest h-8 md:h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card">
                        <SelectItem value="ENABLED">ENABLED</SelectItem>
                        <SelectItem value="RESTRICTED">RESTRICTED</SelectItem>
                        <SelectItem value="DISABLED">DISABLED</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}