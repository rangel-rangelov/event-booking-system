import { EventForm } from '@/components/organisms/event-form';

const CreateEvent = (): JSX.Element => {
  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <EventForm />
    </div>
  );
};

export default CreateEvent;
