import React, { useState } from 'react';

import './App.css';

function App() {
  
  // Render a stack of squares
  function renderSquares(index, amount, type) {
    let squares = [];
    
    for (let i=0; i<amount; i++) {
      squares.push(<div key={`${index}-${type}-${i}`} className={`square ${type}`}></div>);
      
    }
    return squares;
  }
  
  // Increment current height at index
  function increment(index) {
    let a = [...heightMap];
    
    a[index] = a[index] + 1;
    
    setHeightMap(a);
  }
  
  // Decrement current height at index
  function decrement(index) {
    let a = [...heightMap];
    
    if (a[index] > 0) {
      a[index] = a[index] - 1;
    }
    
    setHeightMap(a);
  }  
  
  // Find previous max in an array
  function findPrevMax(m, index) {
    let max = 0;
  
    for (let i=0; i<index; i++) {
      let c = m[i];
    
      if (c > max) {
        max = c;
      }
    }
    
    return max;
  }  
  
  // Find next max in an array
  function findNextMax(m, index) {
    let max = 0;
  
    for (let i=index+1; i<m.length; i++) {
      let c = m[i];
    
      if (c > max) {
        max = c;
      }
    }
    
    return max;  
  }
  
  const [heightMap, setHeightMap] = useState([0,1,0,2,1,0,1,3,2,1,2,1]);
  
  let waterMap = [];
  
  // Loop through height map and calculate value between peaks
  for (let i=0; i<heightMap.length; i++) {
    let currentHeight = heightMap[i];
    
    // Find previous and next peaks form index
    let prevMax = findPrevMax(heightMap, i);
    
    let nextMax = findNextMax(heightMap, i);
    
    // Water level is determined by lowest of the two peak heights
    let localMinimum = Math.min(prevMax, nextMax);
    
    let waterHeight = 0;
    
    // If the peak heights are more then the current height,
    // the difference is filled with water
    if (localMinimum > currentHeight) {
      waterHeight = localMinimum - currentHeight;
    }
    
    waterMap.push(waterHeight);
    
    console.log('current', currentHeight, 'prev', prevMax, 'next', nextMax, 'min', localMinimum, 'water', waterHeight);
  
  
  }
  
  console.log(JSON.stringify(heightMap));
  console.log(JSON.stringify(waterMap));
  
  // Sum all water to return a total
  let totalWater = waterMap.reduce((a,b) => a + b, 0);
  
  console.log(totalWater);
  
  // Find tallest peak, so we know how high to render air
  let maxHeight = findNextMax(heightMap, -1);

  return (
    <div className="App">
      <h2>Water Mapper</h2>
      
      <div className="rows">
        {heightMap && heightMap.map((item, index) => {
        
          let groundHeight = item;
          let waterHeight = waterMap[index];
          let airHeight = maxHeight - waterHeight - groundHeight;
        
          return (
            <div className="row" key={index}>
              {renderSquares(index, airHeight, 'air')}
              {renderSquares(index, waterHeight, 'water')}
              {renderSquares(index, groundHeight, 'ground')}
              
              <div className="controls">
                <button onClick={() => decrement(index)}>-</button>
                <button onClick={() => increment(index)}>+</button> 
              </div>
            
            
            </div>
          );
        })}
      </div>
      
      <div className="total">{totalWater} total water</div>
    </div>
  );
}

export default App;
