"use client"

import { useState, useEffect } from 'react'
import {Row,Col,Input,Button,Select} from 'antd'

const Conditions = ({value=[{
    id:'a',
    a:'',
    b:'',
c:'',
d:'',
e:'',
f:'',
g:'',
h:'',
i:''}],onChange}) => {

    const [conditionList, setConditionList] = useState([...value])
    const [displayValue, setDisplayValue] =useState('')
    const handleDelete = (id) => {
        setConditionList(conditionList.filter((item) => item.id !== id));
    }

    const handleAdd = (ID) =>{
        setConditionList([...conditionList,{
            id:ID,
            a:'',
            b:'',
            c:'',
            d:'',
            e:'',
            f:'',
            g:'',
            h:'',
            i:''}])
        console.log(conditionList)
    }

    const handleChange = (ID,key,value) =>{

        const updatedList = [...conditionList];

        const itemToUpdate = updatedList.find(item => item.id === ID);
        if (itemToUpdate) {
            itemToUpdate[key] = value?.target?.value ? value.target.value:value;
        }

        setConditionList(updatedList);
    }

    useEffect(()=>{
        setDisplayValue(JSON.stringify(conditionList))
    },[conditionList])


    return (
        <div className="w-full">
            {
                conditionList.map((item)=>{
                    return(
                        <Row key={item.id} className="mb-4">
                            <Col span={6} >
                                <Select
                                    defaultValue="Type"
                                    value={item.a}
                                    style={{ width: 120 }}
                                    onChange={(value)=>handleChange(item.id,'a',value)}
                                    options={[
                                        { value: 'Type', label: 'Type' },
                                        { value: 'lucy', label: 'Lucy' },
                                        { value: 'Yiminghe', label: 'yiminghe' },
                                        { value: 'disabled', label: 'Disabled', disabled: true },
                                    ]}
                                />
                            </Col>
                            <Col span={12}>
                                <Row>
                                    <Col span={6}>
                                        <Input onChange={(value)=>handleChange(item.id,'b',value)}  value={item.b} placeholder="Basic usage" />
                                    </Col>
                                    <Col span={6}>
                                        <Input onChange={(value)=>handleChange(item.id,'c',value)} value={item.c} placeholder="Basic usage" />
                                    </Col>
                                    <Col span={6}>
                                        <Input onChange={(value)=>handleChange(item.id,'d',value)} value={item.d} placeholder="Basic usage" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6}>
                                        <Input onChange={(value)=>handleChange(item.id,'e',value)} value={item.e} placeholder="Basic usage" />
                                    </Col>
                                    <Col span={6}>
                                        <Input onChange={(value)=>handleChange(item.id,'f',value)} value={item.f} placeholder="Basic usage" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6} value={item.g}><Input onChange={(value)=>handleChange(item.id,'g',value)} value={item.g} placeholder="Basic usage" /></Col>
                                    <Col span={6} value={item.h}><Input onChange={(value)=>handleChange(item.id,'h',value)} value={item.h} placeholder="Basic usage" /></Col>
                                    <Col span={6} value={item.i}><Input onChange={(value)=>handleChange(item.id,'i',value)} value={item.i} placeholder="Basic usage" /></Col>
                                </Row>
                            </Col>
                            <Col span={6}>
                                <Button onClick={()=>handleDelete(item.id)}>Remove</Button>
                            </Col>
                        </Row>
                    )
                })
            }

            <div className="mt-3">
                <Button type="default" onClick={()=>handleAdd(window.crypto.getRandomValues(new Uint32Array(10)).toString())}>add Condition</Button>
            </div>
            <div>{displayValue}</div>
        </div>
    )
}

export default Conditions
