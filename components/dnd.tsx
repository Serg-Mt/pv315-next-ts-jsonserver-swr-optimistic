'use client';
import { ReactNode, useCallback, useState } from 'react';
import classes from './style.module.css';

const
  dropZonesNumber = 3,
  ballsNumber = 4;
// dropZones = Array.from({ length: dropZonesNumber }, (_, i) =>
//   <DropZone key={i} />);

export function DnDDemo() {
  const
    [balls, setBalls] = useState(
      Array.from({ length: ballsNumber }, (_, i) => ({
        boxNumber: 0,
        component: <Dragable index={i} key={i} > {i}</ Dragable>
      }))
    ),
    moveTo = useCallback((i: number, to: number) => {
      setBalls(prev => {
        const
          prevElem = prev[i],
          newElem = { ...prevElem, boxNumber: to };
        return prev.with(i, newElem);
      })
    }, []);
  return <main className={classes.main}>
    {Array.from({ length: dropZonesNumber }, (_, i) =>
      <DropZone key={i} index={i} moveTo={moveTo}>
        {balls
          .filter(({ boxNumber }) => boxNumber === i)
          .map(({ component }) => component)
        }
      </DropZone>)}
  </main>
}

function DropZone({ index, moveTo, children }:
  {
    index: number,
    moveTo: (_: number, __: number) => void,
    children: ReactNode
  }
) {
  const
    [highlight, setHighlight] = useState(false),
    className = [classes.target, highlight ? classes.active : ''].join(' ');
  return <div
    className={className}
    onDragOver={
      event => {
        event.preventDefault();
        setHighlight(true);
      }
    }
    onDragLeave={() => {
      setHighlight(false);
    }}
    onDrop={event => {
      const
        ballIndex = event.dataTransfer.getData("text/plain");
      moveTo(+ballIndex, index);
      setHighlight(false);
    }}
  >
    {children}
  </div>
}


function Dragable({ index, children }
  : { index: number, children: ReactNode }
) {
  console.log('render Dragable', index);
  const
    [inDrag, setInDrag] = useState(false),
    className = [classes.round, inDrag ? classes.dragging : ''].join(' ');
  return <div
    onDragStart={event => {
      event.dataTransfer.setData("text/plain", String(index));
      setInDrag(true);
    }}
    onDragEnd={() => setInDrag(false)}
    className={className}
    draggable="true">
    {children}
  </div>
}