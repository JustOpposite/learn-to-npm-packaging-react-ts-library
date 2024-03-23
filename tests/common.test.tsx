import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'
import { MyCounter } from '../src/components/MyCounter'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<MyCounter />)
  })
})
