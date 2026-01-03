import { createBrowserRouter, redirect } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Home } from '../pages/Home'
import { Api } from '../pages/Api'
import { Docs } from '../pages/Docs'
import { Examples } from '../pages/Examples'
import { Playground } from '../pages/Playground'

export function createRouter() {
  return createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'api', element: <Api /> },
        { path: 'docs', element: <Docs /> },
        { path: 'examples', element: <Examples /> },
        { path: 'playground', element: <Playground /> },
      ],
    },
  ])
}
