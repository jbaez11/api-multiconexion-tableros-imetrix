
const {baseKeywordsModelSufi,baseKeywordsModelBancolombia} = require('../modelos/basekeywords.modelo')

let mostrarBaseKeywords = async (req,res)=>{
    console.log('host',req.params.bd )
    switch(req.params.bd){
        case 'igsBancolombiaCO':
            baseKeywordsModelBancolombia.find({}).exec((err,data)=>{
                if(err){
                    return res.json({
                        status : 500,
                        mensaje: "Error en la petición"
                    })
                }
        
                res.json({
                    status: 200,
                    data
                })
            })

            return baseKeywordsModelBancolombia;
        case 'igsSufiCO':
            baseKeywordsModelSufi.find({}).exec((err,data)=>{
                if(err){
                    return res.json({
                        status : 500,
                        mensaje: "Error en la petición"
                    })
                }
        
                res.json({
                    status: 200,
                    data
                })
            })

            return baseKeywordsModelSufi
    }
    
}

//crear baseKeywords

 let crearBaseKeywords = (req,res)=>{

     //obtener cuerpo del formulario

     let body = req.body;
    console.log('body 1' , req.body);
     
    let baseKeywords;

     switch(req.params.bd){
         case 'igsBancolombiaCO':
            console.log('body 2' , body);
             //obtener datos del formulario y pasarlos al modelo

              baseKeywords =  new baseKeywordsModelBancolombia({
                
                 name: body.name.toUpperCase(),
                 identification: body.identification,
                 gender: body.gender

                
             })
             
             
             break;
             

         case 'igsSufiCO':

             //obtener datos del formulario y pasarlos al modelo

              agents = new baseKeywordsModelSufi({
                
                 name: body.name.toUpperCase(),
                 identification: body.identification,
                 gender: body.gender

                
             })

             break;
             


     }

     // guardar en mongo db
     agents.save((err,data)=>{
        if(err){

            return res.json({
            status:400,
            mensaje:"Error al almacenar el agente",
            err
            })
        }

        res.json({
            status:200,
            data,
            mensaje:"El agente ha sido creado con exito"
        })
    });
    
 }



module.exports = {
    mostrarBaseKeywords,
    crearBaseKeywords
}

