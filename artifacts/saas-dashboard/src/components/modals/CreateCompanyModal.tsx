import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, X } from 'lucide-react';
import { companySchema, type CompanyInput, useCreateCompany } from '../../hooks/use-company';
import { Button, Input, Card } from '../ui/shared';

export function CreateCompanyModal({ isOpen, onClose, required = false }: { isOpen: boolean; onClose: () => void; required?: boolean }) {
  const { register, handleSubmit, formState: { errors } } = useForm<CompanyInput>({
    resolver: zodResolver(companySchema)
  });
  const createCompany = useCreateCompany();

  if (!isOpen) return null;

  const onSubmit = (data: CompanyInput) => {
    createCompany.mutate(data, {
      onSuccess: () => {
        if (!required) onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4 animate-fade-in">
      <Card className="w-full max-w-lg shadow-2xl animate-slide-up overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between border-b px-6 py-4 bg-background">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Create Organization</h2>
              <p className="text-sm text-muted-foreground">Set up your company profile to get started.</p>
            </div>
          </div>
          {!required && (
            <button onClick={onClose} className="p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form id="company-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input 
              label="Company Name" 
              placeholder="Acme Corp" 
              {...register('companyName')} 
              error={errors.companyName?.message} 
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                label="Email Address" 
                type="email" 
                placeholder="contact@acme.com" 
                {...register('companyEmailId')} 
                error={errors.companyEmailId?.message} 
            />
              <Input 
                label="Phone Number" 
                placeholder="+1 555-0000" 
                {...register('companyPhone')} 
                error={errors.companyPhone?.message} 
              />
            </div>
            <Input 
              label="Address" 
              placeholder="123 Business Rd, Tech City" 
              {...register('companyAddress')} 
              error={errors.companyAddress?.message} 
            />
            <Input 
              label="Description (Optional)" 
              placeholder="Software solutions provider" 
              {...register('companyDescription')} 
              error={errors.companyDescription?.message} 
            />
          </form>
        </div>
        
        <div className="border-t bg-muted/30 px-6 py-4 flex justify-end gap-3">
          {!required && (
            <Button variant="ghost" onClick={onClose} type="button">
              Cancel
            </Button>
          )}
          <Button type="submit" form="company-form" isLoading={createCompany.isPending}>
            Complete Setup
          </Button>
        </div>
      </Card>
    </div>
  );
}
