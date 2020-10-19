import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Graph from '../../helpers/Graph'

import Menu from '../../components/Menu'
import Panel from '../../components/Panel'
import Output from '../../components/Output'

import Button from '../../components/Button'
import Input from '../../components/Input'
import Draw from '../../components/Draw'
import Modal from '../../components/Modal'

import image from '../../img/panorama-black-18dp.svg'

import './style.css'

const Main = () => {
  const [ expandedNodes, setExpandedNodes ] = useState('vazio')
  const [ path, setPath ] = useState('vazio')
  const [ totalCost, setTotalCost ] = useState(0)
  const [ origin, setOrigin ] = useState('')
  const [ destination, setDestination ] = useState('')
  const [ routes, setRoutes ] = useState(null)
  const [ algorithm, setAlgorithm ] = useState('bfs')
  const [ digraph, setDigraph ] = useState(false)
  const [ hasCost, setHasCost ] = useState(null)
  const [ modal, setModal ] = useState('not-visible')
  const [ data, setData ] = useState(null)
  const [ cost, setCost ] = useState(null)
  const [ file, setFile ] = useState()
  const [ upload, setUpload ] = useState()

  useEffect(() => {
    if(file) {
      (async () => {
        const formData = new FormData()

        formData.append('file', file)

        axios.post('http://localhost:3001/upload', formData)

        const { data } = await axios.get('http://localhost:3001/data?name=' + file.name)

        setUpload(data)
      })()
    }
  }, [file, upload])

  useEffect(() => {
    if(upload) {
      const { routes, cost, digraph } = upload

      setRoutes(routes)
      setCost(cost)
      setDigraph(digraph)

      draw()
    }
  }, [upload])

  const init = () => {
    const modalRoutes = document.querySelector('.modal-routes')

    const inputs = modalRoutes.querySelectorAll('input')

    const routes = []
    const cost = []

    routes.push([])

    let a = 0

    inputs.forEach((input, index) => {
      if(!hasCost) {
        routes[a].push(input.value)

        if(index % 2 && index > 0) {
          routes.push([])
          a++
        } 
      } else {
        if(input.placeholder !== 'Custo') {
          routes[a].push(input.value)

          if(index % 3 && index > 0) {
            routes.push([])
            a++
          } 
        } else {
          cost.push(Number(input.value))
        }

        setCost(cost.filter(value => value))
      }
    })

    setRoutes(routes.filter(([ origin, destination ]) => origin || destination))
  }

  const draw = () => {
    if(routes) {
      const graph = new Graph(routes, cost, digraph)

      setData(graph.draw())
    }
  }

  const search = () => {
    if(routes) {
      const graph = new Graph(routes, cost, digraph, algorithm)

      const data = graph.start(origin, destination)

      const { expandedNodes, isPath } = data

      setExpandedNodes(
        expandedNodes[0] 
          ? expandedNodes.map((node, index) => {
              return expandedNodes.length - 1 > index ? `${node} => ` : node
            })
          : 'vazio'
      )

      if(isPath) {
        const { path, totalCost } = data

        setPath(
          path.map((node, index) => {
            return path.length - 1 > index ? `${node} => ` : node
          })
        )
        
        setTotalCost(totalCost)
      } else {
        setPath('não existe')
        setTotalCost(0)
      }
    }
  }

  return (
    <main className="container">
      <section>
        <Menu 
          algorithm={algorithm} 
          create={
            <Button 
              label="Criar Grafo" type="button" 
              handleChange={() => { setModal('') }}
            />
          }
          upload={
            <Button 
              label="Carregar Grafo" type="file" 
              handleFile={event => setFile(event.target.files[0])}
            />
          }
          handleChange={event => setAlgorithm(event.target.value)}
          modal={
            <Modal 
              display={modal} routes={routes}
              origin={origin} destination={destination}
              digraph={digraph} cost={hasCost}
              handleChange={() => init()}
              handleDigraph={event => setDigraph(event.target.value)}
              handleCost={event => setHasCost(event.target.value)}
              input={
                <Input 
                  handleOrigin={event => setOrigin(event.target.value)}
                  handleDestination={event => setDestination(event.target.value)}
                  cost={hasCost}
                />
              }
              button={
                <Button 
                  label="Salvar" 
                  handleChange={() => {
                    setModal('not-visible')
                    draw()
                  }}
                />
              }
            />
          }
        />
      </section>
      <section>
        <Panel 
          image={image} routes={routes}
          input={
            <Input 
              handleOrigin={event => setOrigin(event.target.value)}
              handleDestination={event => setDestination(event.target.value)}
            />
          }
          button={
            <Button 
              label="Buscar" type="button" 
              handleChange={() => search()}
            />
          }
          data={data}
          draw={<Draw data={data} digraph={digraph} />}
        />
      </section>
      <section>
        <Output label="Caminho:" value={path} />
        <Output label="Custo:" value={totalCost} />
        <Output label="Nós Expandidos:" value={expandedNodes} />
      </section>
    </main>
  )
}

export default Main