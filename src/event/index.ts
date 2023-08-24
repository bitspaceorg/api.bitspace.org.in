import { prisma } from "../../libs/utils/prisma";
import { Module } from "../../libs/utils/types/module"
import express from "express";
import { events } from "./types";

const router = express.Router();
const BASE_ROUTE = "/event";
// GET
router.get("/workshops", async ( _ , res ) => {
    const data = await prisma.workshop.findMany();
    let events : {upcomming : Array<events>, past : Array<events>} = {upcomming:[],past:[]}
    data.forEach((ele)=>{
        if(ele.is_completed)
            events.past.push(ele)
        else
            events.upcomming.push(ele)
    })
    res.send({events})
});

router.get("/",async(req,res)=>{
    const id : string = req.query.work_id as string ;
    const workshop = await prisma.workshop.findUnique({
        where : { id },
        include : {
            slots : {
                orderBy : {
                    date : "asc"
                }
            }
        }
    })
    res.send(workshop)
})

// POST
router.post("/workshop", async (req,res) => {
    const { slot_id } = req.body ;
    const user_id = "navi-prem"
    const data = await prisma.workshop_user.findMany({
        where : { user_id }
    })
    if(data.length === 0){
            const slot = await prisma.slots.findUnique({
                where : { id : slot_id }
            })
            if ( slot?.count! < slot?.max_count! ){
                await prisma.slots.update({
                    where : { id : slot_id },
                    data : {count :slot?.count!+1}
                })
                await prisma.workshop_user.create({
                    data : {
                        slots : {
                            connect : {
                                id : slot_id ,
                            }
                        },
                        users : {
                            connect : {
                                username : user_id
                            }
                        },
                        point : "OK"
                    }
                })
                res.send({status:true,data:"Sucessfully Registered, Check Your Mail"})
                return
            }else{
                res.send({status:false,data:"Sorry all the Slots are full"})
                return
            }
    }else{
        res.send({status:true,data:"Already Registered"})
        return
    }
});

// PUT
router.put("/", async () => { });

// DELETE
router.delete("/", async () => { });

const MODULE: Module = {
    router,
    BASE_ROUTE
};

export default MODULE;
