import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import QuoteSkeleton from '../components/QuoteSkeleton';

describe('QuoteSkeleton', () => {
  it('renders skeleton loading state', () => {
    const { container } = render(<QuoteSkeleton />);
    const skeleton = container.querySelector('.animate-pulse');
    expect(skeleton).toBeTruthy();
  });
});
