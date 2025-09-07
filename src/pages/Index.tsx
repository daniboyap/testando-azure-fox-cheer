import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import PersonForm, { Person } from '@/components/PersonForm';
import PersonList from '@/components/PersonList';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const { user, profile, logout } = useAuth();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('persons')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        showError('Erro ao buscar pessoas: ' + error.message);
      } else {
        setPeople(data || []);
      }
      setLoading(false);
    };

    fetchPeople();
  }, [user]);

  const handleSavePerson = async (person: Omit<Person, 'id'>) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('persons')
      .insert([{ ...person, user_id: user.id }])
      .select();

    if (error) {
      showError('Erro ao salvar pessoa: ' + error.message);
    } else if (data) {
      setPeople(prevPeople => [data[0], ...prevPeople]);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Bem-vindo(a), {profile?.full_name || user?.email}!</h1>
          <p className="text-gray-500">Gerencie os cadastros de pessoas físicas.</p>
        </div>
        <Button onClick={logout} variant="outline">Sair</Button>
      </header>
      
      <main>
        <PersonForm onSave={handleSavePerson} />
        {loading ? (
          <div className="mt-8 space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <PersonList people={people} />
        )}
      </main>
    </div>
  );
};

export default Index;