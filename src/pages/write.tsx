import { WriteForm, EpisodeFormValues } from '../components/WriteForm';
import { AppError } from '../types/error';
import { ERROR_MESSAGES } from '../enums/error';
import { useCreateEpisode } from '../hooks/useCreateEpisode';

export default function WritePage() {
  const { mutate, isPending, isError, error, reset } = useCreateEpisode();

  const errorMessage =
    isError && error instanceof AppError
      ? (ERROR_MESSAGES[error.code] ?? error.message)
      : undefined;

  const handleSubmit = (values: EpisodeFormValues) => {
    reset();
    mutate({ title: values.title, content: values.content });
  };

  return (
    <main>
      <WriteForm
        onSubmit={handleSubmit}
        isPending={isPending}
        errorMessage={errorMessage}
      />
    </main>
  );
}
