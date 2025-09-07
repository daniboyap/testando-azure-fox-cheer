import { Person } from './PersonForm';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface PersonListProps {
  people: Person[];
}

const PersonList = ({ people }: PersonListProps) => {
  if (people.length === 0) {
    return (
        <div className="text-center text-gray-500 mt-8">
            Nenhuma pessoa cadastrada ainda.
        </div>
    );
  }

  return (
    <Card className="mt-8">
        <CardHeader>
            <CardTitle>Pessoas Cadastradas</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
            {people.map((person) => (
                <AccordionItem value={`item-${person.id}`} key={person.id}>
                <AccordionTrigger>
                    <div className="flex justify-between w-full pr-4">
                        <span>{person.fullName}</span>
                        <span className="text-gray-500">{person.cpf}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-2 p-2">
                        <p><strong>Data de Nascimento:</strong> {person.birthDate}</p>
                        <p><strong>Endereço:</strong> {person.address}</p>
                        <p><strong>Telefone:</strong> {person.phone}</p>
                    </div>
                </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        </CardContent>
    </Card>
  );
};

export default PersonList;