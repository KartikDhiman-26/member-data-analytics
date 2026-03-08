import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"

import { Doughnut } from "react-chartjs-2"
import { useState } from "react"

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

const COLORS = [
  "#6366F1","#22C55E","#F59E0B","#EF4444","#14B8A6",
  "#8B5CF6","#EC4899","#3B82F6","#F97316","#10B981",
  "#06B6D4","#E11D48","#84CC16","#0EA5E9","#D946EF"
]

function getColors(count){
  const arr=[]
  for(let i=0;i<count;i++){
    arr.push(COLORS[i % COLORS.length])
  }
  return arr
}

function processData(data,limit){
  const main={}
  const others={}

  Object.entries(data).forEach(([key,value])=>{
    if(value>=limit){
      main[key]=value
    }else{
      others[key]=value
    }
  })

  const otherTotal = Object.values(others).reduce((a,b)=>a+b,0)

  if(otherTotal>0){
    main["Other"]=otherTotal
  }

  return {main,others}
}

function DonutChart({title,data,limit}){
  const [selected,setSelected]=useState(null)
  const [expandOther,setExpandOther]=useState(false)

  if(!data) return null

  const {main,others}=processData(data,limit)

  const labels=Object.keys(main)
  const values=Object.values(main)

  const total = values.reduce((a,b)=>a+b,0)

  const chartData = {
    labels,
    datasets:[
      {
        data:values,
        backgroundColor:getColors(labels.length),
        borderWidth:1
      }
    ]
  }

  const options={
    cutout:"70%",
    plugins:{
      legend:{
        position:"bottom",
        labels:{
          boxWidth:18,
          padding:15
        }
      },
      tooltip:{
        callbacks:{
          label:function(context){
            const value=context.raw
            const percent=((value/total)*100).toFixed(1)
            return `${context.label}: ${value} (${percent}%)`
          }
        }
      },
      // ✅ This disables the center text that was showing "undefined"
      doughnutLabel: false
    },
    onClick:(event,elements)=>{
      if(elements.length>0){
        const index=elements[0].index
        setSelected({
          label:labels[index],
          value:values[index]
        })
      }
    }
  }

  // ✅ Unregister any globally registered centerText/doughnutLabel plugins
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart) {
      const { ctx } = chart
      ctx.save()
      // Clear the center area to prevent any stray text
      const { top, bottom, left, right } = chart.chartArea
      const centerX = (left + right) / 2
      const centerY = (top + bottom) / 2
      const innerRadius = chart._metasets?.[0]?.data?.[0]?.innerRadius ?? 0
      ctx.beginPath()
      ctx.arc(centerX, centerY, innerRadius - 1, 0, Math.PI * 2)
      ctx.fillStyle = chart.options.plugins?.centerFill ?? "#ffffff"
      ctx.fill()
      ctx.restore()
    }
  }

  return(
    <div className="w-full max-w-150 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {title}
        </h3>
        <div className="text-sm text-gray-600">
          Total Students: <strong>{total}</strong>
        </div>
      </div>

      <Doughnut
        data={chartData}
        options={options}
        plugins={[centerTextPlugin]}
      />

      {selected && (
        <div className="mt-4 text-sm text-center">
          <strong>{selected.label}</strong>
          {" : "}
          {selected.value} students
        </div>
      )}

      {"Other" in main && (
        <div className="text-center">
          <button
            onClick={()=>setExpandOther(!expandOther)}
            className="mt-3 text-blue-600 underline"
          >
            {expandOther ? "Hide Other Details" : "Expand Other"}
          </button>
        </div>
      )}

      {expandOther && (
        <div className="mt-3 text-sm text-center">
          {Object.entries(others).map(([key,value])=>(
            <div key={key}>
              {key}: {value}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function DepartmentPie({data}){
  return(
    <DonutChart
      title="Students per Department"
      data={data}
      limit={200}
    />
  )
}

export function ClubPie({data}){
  return(
    <DonutChart
      title="Students per Club"
      data={data}
      limit={100}
    />
  )
}