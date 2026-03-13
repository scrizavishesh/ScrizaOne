import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAgents, useCreateAgent, agentSchema, type AgentInput } from '../hooks/use-agents';
import { Card, Button, Badge, Input } from '../components/ui/shared';
import { Plus, Search, MoreHorizontal, X, User } from 'lucide-react';

function CreateAgentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AgentInput>({
    resolver: zodResolver(agentSchema),
    defaultValues: { roleType: 'AGENT', userGender: 'OTHER' }
  });
  const createAgent = useCreateAgent();

  if (!isOpen) return null;

  const onSubmit = (data: AgentInput) => {
    createAgent.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4 animate-fade-in">
      <Card className="w-full max-w-lg shadow-2xl animate-slide-up overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between border-b px-6 py-4 bg-background">
          <div>
            <h2 className="text-lg font-bold text-foreground">Add New Agent</h2>
            <p className="text-sm text-muted-foreground">Invite a team member to manage chats.</p>
          </div>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form id="agent-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Full Name" placeholder="Jane Doe" {...register('userName')} error={errors.userName?.message} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Email Address" type="email" placeholder="jane@company.com" {...register('userEmail')} error={errors.userEmail?.message} />
              <Input label="Phone Number" placeholder="+1 555-0000" {...register('userPhoneNo')} error={errors.userPhoneNo?.message} />
            </div>
            <Input label="Designation" placeholder="e.g. Sales Representative" {...register('designation')} error={errors.designation?.message} />
            <Input label="Address" placeholder="City, Country" {...register('userAddress')} error={errors.userAddress?.message} />
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Gender</label>
              <select 
                {...register('userGender')} 
                className="flex w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </form>
        </div>
        
        <div className="border-t bg-muted/30 px-6 py-4 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
          <Button type="submit" form="agent-form" isLoading={createAgent.isPending}>Add Agent</Button>
        </div>
      </Card>
    </div>
  );
}

export default function Agents() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { data: agents = [], isLoading } = useAgents();

  const filteredAgents = agents.filter(agent => 
    agent.userName?.toLowerCase().includes(search.toLowerCase()) ||
    agent.userEmail?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Team Agents</h1>
          <p className="mt-2 text-muted-foreground">Manage your support and sales agents.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-5 w-5 mr-2" />
          Add Agent
        </Button>
      </div>

      <Card className="overflow-hidden border-border/50">
        <div className="p-4 border-b flex justify-between items-center bg-muted/20">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search agents..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/50 text-muted-foreground font-semibold">
              <tr>
                <th className="px-6 py-4">Agent Name</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Designation</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    <div className="flex justify-center mb-2"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>
                    Loading agents...
                  </td>
                </tr>
              ) : filteredAgents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    <User className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
                    <p className="text-lg font-medium text-foreground">No agents found</p>
                    <p>Try adjusting your search or add a new agent.</p>
                  </td>
                </tr>
              ) : (
                filteredAgents.map((agent: any) => (
                  <tr key={agent.id || agent.userEmail} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {agent.userName?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{agent.userName}</p>
                          <p className="text-xs text-muted-foreground">{agent.roleType || 'AGENT'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-foreground">{agent.userEmail}</p>
                      <p className="text-xs text-muted-foreground">{agent.userPhoneNo}</p>
                    </td>
                    <td className="px-6 py-4 text-foreground">{agent.designation}</td>
                    <td className="px-6 py-4">
                      <Badge variant={agent.status === 'ACTIVE' ? 'success' : 'default'}>
                        {agent.status || 'ACTIVE'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <CreateAgentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
