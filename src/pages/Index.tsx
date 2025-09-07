import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import PersonForm, { Person } from '@/components/PersonForm';
import PersonList from '@/components/PersonList';

const Index = () => {
  const { currentUser, logout } = useAuth();
  const [people, setPeople] = useState<Person[]>([]);

  const handleSavePerson = (person: Person) => {
    setPeople(prevPeople => [...prevPeople, person]);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Bem-vindo(a), {currentUser?.name}!</h1>
          <p className="text-gray-500">Gerencie os cadastros de pessoas físicas.</p>
        </div>
        <Button onClick={logout} variant="outline">Sair</Button>
      </header>
      
      <main>
        <PersonForm onSave={handleSavePerson} />
        <PersonList people={people} />
      </main>
    </div>
  );
};

export default Index;