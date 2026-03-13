import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useLocation } from 'wouter';
import { Card, Button } from '../components/ui/shared';
import { CreateCompanyModal } from '../components/modals/CreateCompanyModal';
import { MessageCircle, Facebook, Instagram, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Connect your WhatsApp Business API to manage conversations at scale.',
    icon: MessageCircle,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    gradient: 'from-emerald-500/20 to-transparent',
    path: '/whatsapp-dashboard',
  },
  {
    id: 'facebook',
    name: 'Facebook Messenger',
    description: 'Integrate your Facebook pages to respond to customers directly.',
    icon: Facebook,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    gradient: 'from-blue-500/20 to-transparent',
    path: '#', // coming soon
  },
  {
    id: 'instagram',
    name: 'Instagram Direct',
    description: 'Manage Instagram DMs and story replies from a single inbox.',
    icon: Instagram,
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
    gradient: 'from-pink-500/20 to-transparent',
    path: '#', // coming soon
  },
];

export default function Dashboard() {
  const companyId = useSelector((state: RootState) => state.auth.companyId);
  const [, setLocation] = useLocation();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Overview</h1>
        <p className="mt-2 text-muted-foreground">Welcome to SocialOne! Connect your services below.</p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service, idx) => (
          <Card key={service.id} className="relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-border/60">
            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="p-6 relative z-10">
              <div className={`h-14 w-14 rounded-2xl ${service.bg} flex items-center justify-center mb-6`}>
                <service.icon className={`h-7 w-7 ${service.color}`} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{service.name}</h3>
              <p className="text-sm text-muted-foreground mb-8 min-h-[40px]">
                {service.description}
              </p>
              <Button 
                variant={service.id === 'whatsapp' ? 'primary' : 'outline'} 
                className="w-full group/btn"
                onClick={() => service.path !== '#' && setLocation(service.path)}
              >
                {service.id === 'whatsapp' ? 'Manage Service' : 'Connect'}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Required Modal if no company is created yet */}
      <CreateCompanyModal isOpen={!companyId} onClose={() => {}} required={true} />
    </div>
  );
}
