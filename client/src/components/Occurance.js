import { React } from 'react';

export default function Occurance(props) {
  const occurancePercentage = ((props.occurance / 50) * 100).toFixed(2);
  return (
    <section className='boxForOccurance'>
      <section>{props.attribute}</section>
      <section>{props.name}</section>
      <section>{occurancePercentage}%</section>
    </section>
  );
}
