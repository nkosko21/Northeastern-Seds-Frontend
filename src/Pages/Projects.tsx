import React from "react";
import Navigationbar from "../Components/Navigationbar";
import { Accordion } from '@mantine/core';
const projects = [
  {
    value: 'name',
    emoji: '💀',
    description: 'description'
  }
];
export default function Projects() {

  const items = projects.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return(
  <>
    <Navigationbar highlighted={'projects'}/>
    <div className="projects-container">
      <Accordion variant="separated" radius="xl" defaultValue="Apples">
        {items}
      </Accordion>
    </div>
  </>
  );
}
