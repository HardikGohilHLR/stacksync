// Compare page
import { Metadata } from 'next';

import { getMetaData } from '@/lib/utils/meta-data';

import { Compare } from '@/components/compare';

export const metadata: Metadata = getMetaData('compare');

const page = () => {
  return (
    <>
      <Compare />
    </>
  );
};

export default page;
