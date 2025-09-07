import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showSuccess } from '@/utils/toast';

export interface Person {
  id: number;
  fullName: string;
  cpf: string;
  birthDate: string;
  address: string;
  phone: string;
}

interface PersonFormProps {
  onSave: (person: Person) => void;
}

const PersonForm = ({ onSave }: PersonFormProps) => {
  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPerson: Person = {
      id: Date.now(),
      fullName,
      cpf,
      birthDate,
      address,
      phone,
    };
    onSave(newPerson);
    showSuccess('Pessoa cadastrada com sucesso!');
    // Limpar formulário
    setFullName('');
    setCpf('');
    setBirthDate('');
    setAddress('');
    setPhone('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastro de Pessoa Física</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome completo</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate">Data de nascimento</Label>
              <Input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <Button type="submit">Salvar</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonForm;