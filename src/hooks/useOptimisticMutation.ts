import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';

interface OptimisticConfig<TData, TVariables, TContext> {
  queryKey: QueryKey;
  updater?: (oldData: TData | undefined, variables: TVariables) => TData;
  mutationFn: (variables: TVariables) => Promise<any>;
  onSuccess?: (data: any, variables: TVariables) => void;
  onError?: (error: unknown) => void;
  confirmFn?: () => Promise<boolean>;
}

export function useOptimisticMutation<TData, TVariables>({
  queryKey,
  updater,
  mutationFn,
  onSuccess,
  onError,
}: OptimisticConfig<TData, TVariables, { previousData: TData | undefined }>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<TData>(queryKey);

      queryClient.setQueryData<TData>(queryKey, (old) =>
        updater?.(old, variables),
      );

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      onError?.(error);
    },
    onSuccess: (data, variables) => {
      onSuccess?.(data, variables);
    },
  });
}
