import { ReactNode } from 'react';

type Props = { title: string; children: ReactNode };

const Card = ({ title, children }: Props) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <div className="text-sm font-semibold text-gray-800 mb-2">{title}</div>
    {children}
  </div>
);

export default Card;

