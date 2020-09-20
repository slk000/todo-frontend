import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, prettyDOM, fireEvent } from '@testing-library/react'
import NoteItem from './NoteItem'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
    date: (new Date()).toString()
  }

  // Render 返回一个具有多个属性的对象。
  // 其中一个属性称为container，它包含由组件渲染的所有 HTML。
  const component = render(
    <NoteItem note={note} />
  )
  
  // 由 render 方法返回的对象具有一个调试方法debug ，该方法可用于将组件渲染的 HTML 打印到控制台。
  component.debug()

  // 还可以搜索组件的一小部分并打印其 HTML 代码。 为了做到这一点，我们需要 prettyDOM 方法
  const p = component.container.querySelector('p')
  console.log(prettyDOM(p))

  // method 1
  // 第一种方法是使用toHaveTextContent方法从组件渲染的整个 HTML 代码中搜索匹配的文本。
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  // method 2
  // 第二种方法是使用 render 方法返回对象的getByText 。 该方法返回包含给定文本的元素。如果不存在此类元素，则发生异常。 出于这个原因，我们在技术上不需要指定任何额外的except
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(element).toBeDefined()

  // method 3
  // 第三种方法是搜索由组件渲染的特定元素，该组件使用querySelector方法，该方法接收CSS 选择器作为其参数
  const div = component.container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicking the btn calls event handler once', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
    date: (new Date()).toString()
  }

  const mockHandler = jest.fn()

  const component = render(
    <NoteItem note={note} onChangeImportance={mockHandler} />
  )

  const btn = component.getByTitle('更改重要性')
  // console.log(prettyDOM(btn))
  fireEvent.click(btn)

  expect(mockHandler.mock.calls).toHaveLength(1)
})