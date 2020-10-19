import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';

import './style.css'

const Draw = ({ data, digraph }) => {
  const ref = React.useRef(null);

  useEffect(() => {
    const div = document.querySelector('.graph')
    const canvas = document.querySelector('.canvas')

    if(canvas)
      canvas.innerHTML = ''

    const width = div.clientWidth - 40
    const height = div.clientHeight + 40

    const defaultEdge = digraph 
      ? {
        style: {
          stroke: '#333',
          endArrow: {
            path: 'M 0,0 L 8,4 L 8,-4 Z',
            fill: '#e2e2e2'
          }
        },
        labelCfg: {
          refY: 8,
          style: {
            fill: '#333'
          }
        }
      } 
      : {
        style: {
          stroke: '#333'
        },
        labelCfg: {
          refY: 8,
          style: {
            fill: '#333'
          }
        }
      }

    const graph = new G6.Graph({
      container: ReactDOM.findDOMNode(ref.current),
      width,
      height,
      fitView: true,
      modes: {
        default: ['drag-canvas', 'drag-node']
      },
      layout: {
        type: 'fruchterman',
        gravity: 5,
        speed: 5
      },
      animate: true,
      defaultNode: {
        size: 30,
        style: {
          fill: '#807373',
          stroke: '#333'
        },
        labelCfg: {
          style: {
            fill: '#fff'
          }
        }
      },
      defaultEdge
    });

    graph.data(data);
    graph.render();
  }, [data]);

  return <div className="canvas" ref={ref}></div>;
}

export default Draw