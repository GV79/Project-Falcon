import React, { useEffect, useState } from 'react';
import { Container } from './DashboardStyles';
import Card from '../components/forms/Card';
import AddForm from '../components/forms/AddForm';

const request = [
  {
    id: 1,
    title: 'Contact Us',
    description: null,
    status: true,
    link: '/view?id:tester',
  },
  {
    id: 2,
    title: 'Registration',
    description: null,
    status: false,
    link: '/view?id:tester2',
  },
];

export default function Dashboard() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    setForms(request);
  }, []);

  return (
    <Container>
      <AddForm />
      {forms.map((data) => (
        <Card data={data} key={data.id} />
      ))}
    </Container>
  );
}
