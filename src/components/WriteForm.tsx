import { useForm } from '../hooks/useForm';

export interface EpisodeFormValues {
  [key: string]: string;
  title: string;
  content: string;
}

interface WriteFormProps {
  onSubmit: (values: EpisodeFormValues) => void;
  isPending: boolean;
  errorMessage?: string;
  submitLabel?: string;
  initialValues?: EpisodeFormValues;
}

const validators = {
  title: (v: string) => (!v.trim() ? '제목을 입력해주세요.' : undefined),
  content: (v: string) => (!v.trim() ? '내용을 입력해주세요.' : undefined),
};

const initialValues: EpisodeFormValues = { title: '', content: '' };

export function WriteForm({
  initialValues = { title: '', content: '' },
  onSubmit,
  isPending,
  errorMessage,
  submitLabel = '작성 완료',
}: WriteFormProps) {
  const { values, errors, handleChange, handleSubmit, reset } =
    useForm<EpisodeFormValues>(initialValues, validators);

  const submit = handleSubmit((values) => {
    onSubmit(values);
    reset();
  });

  return (
    <form onSubmit={submit} className="max-w-3xl mx-auto">
      <div className="flex justify-end items-center gap-4 mb-4">
        {isPending && (
          <span className="text-sm text-gray-400 font-serif animate-pulse">
            저장 중...
          </span>
        )}
        <button
          type="submit"
          disabled={isPending}
          className={`
            px-6 py-2 rounded-md font-sans text-sm transition-all duration-200 text-md font-bold 
            ${
              isPending
                ? 'bg-gray-100 text-gray-200 cursor-not-allowed'
                : ' bg-blue-600 text-white cursor-pointer hover:bg-blue-800'
            }
          `}
        >
          {submitLabel}
        </button>
      </div>

      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-3">
          <label className="text-md font-bold text-gray-500 uppercase tracking-wider ml-1">
            제목
          </label>
          <div className="group">
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="제목을 입력하세요"
              className="w-full bg-white border border-gray-100 rounded-lg text-lg md:text-xl *:text-gray-900 placeholder-gray-200 focus:ring-1 focus:ring-blue-100 focus:border-blue-300 px-6 py-4 transition-all shadow-sm"
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-500 font-sans font-medium flex items-center gap-1">
                *{errors.title}
              </p>
            )}
          </div>
        </section>
        <section className="flex flex-col gap-3">
          <label className="text-md font-bold text-gray-500 uppercase tracking-wider ml-1">
            내용
          </label>
          <textarea
            name="content"
            value={values.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
            className="w-full min-h-[600px] bg-white border border-gray-100 rounded-lg text-lg md:text-xl leading-loose text-gray-800 placeholder-gray-200 focus:ring-1 focus:ring-blue-100 focus:border-blue-300 px-6 py-4 resize-none transition-all shadow-sm"
          />
          {errors.content && (
            <p className="mt-4 text-sm text-red-500 font-sans font-medium flex items-center gap-1">
              *{errors.content}
            </p>
          )}
        </section>
      </div>
    </form>
  );
}
