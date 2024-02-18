import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
//定义组件要传的参数，假数据
const product = {
  id: 1,
  url: 'example.jpg',
  title: 'Example Title',
  desc: 'Example Description',
  doc: 'example.pdf',
  docName: 'example_document.pdf'
};

// 定义滴测试 function 组件里面用到了 translate t('')
const t = jest.fn((text) => text);

// 我组件度用左useDispatch 
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('ProductCard component', () => {
  it('renders product details correctly', () => {
    const { getByText } = render(<ProductCard product={product} />);
    
    expect(getByText('Example Title')).toBeInTheDocument();
    expect(getByText('Example Description')).toBeInTheDocument();
    expect(getByText('ViewMore')).toBeInTheDocument();
  });

  it('navigates to correct link on view more click', () => {
    const { getByText } = render(<ProductCard product={product} />);
    
    fireEvent.click(getByText('ViewMore'));
  });
});
