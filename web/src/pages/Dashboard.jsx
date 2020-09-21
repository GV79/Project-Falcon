import React, { useEffect, useState } from 'react';
import { Container } from './DashboardStyles';
import Card from '../components/forms/Card';
import AddForm from '../components/forms/AddForm';
import { getForms } from '../http/restCalls';

export default function Dashboard() {
  const [forms, setForms] = useState([
    {
      id: 0,
      uuid: 'test',
      title: 'N/A',
      description: '',
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await getForms();
      setForms(data);
      setLoading(false);
    })().catch((err) => {
      setLoading(false);
      console.log(err);
    });
  }, []);

  return (
    <Container>
      <AddForm />
      {forms.map((data) => (
        <Card data={data} loading={loading} key={data.id} />
      ))}
    </Container>
  );
}
