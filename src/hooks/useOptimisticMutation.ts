import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';

interface OptimisticConfig<TData, TVariables, TContext> {
  queryKey: QueryKey;
  updater: (oldData: TData | undefined, variables: TVariables) => TData;
  mutationFn: (variables: TVariables) => Promise<any>;
  onSuccess?: (data: any, variables: TVariables) => void;
}

export function useOptimisticMutation<TData, TVariables>({
  queryKey,
  updater,
  mutationFn,
  onSuccess,
}: OptimisticConfig<TData, TVariables, { previousData: TData | undefined }>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<TData>(queryKey);

      queryClient.setQueryData<TData>(queryKey, (old) =>
        updater(old, variables),
      );

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSuccess: (data, variables) => {
      if (onSuccess) onSuccess(data, variables);
    },
    //TODO:: 할지말지....의미가 있을지 모르겠는
    onSettled: async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
