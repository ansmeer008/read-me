export const ArrowUpIcon = ({
  className = 'w-6 h-6',
}: {
  className?: string;
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 11l7-7 7 7M12 4v16"
    />
  </svg>
);
