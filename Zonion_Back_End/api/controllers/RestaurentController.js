/**
 * RestaurentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */






module.exports = {
  //controller for creating restaurant
  create: async function (req, res) {
    try {
      let param = req.allParams();
      if (!param.restaurentName) {
        return res.badRequest("restaurent name is empty");
      }

      const restaurentCreated = await Restaurent.create({
        restaurentName: param.restaurentName,
        address: param.address,
        phone: param.phone,
        openningTime: param.openningTime,
        closingTime: param.closingTime,
        lastUpdated:'',
        srcImg:param.srcImg,
        activate:param.activate

      });
      return res.ok(restaurentCreated);
    } catch (error) {
      return res.serverError(error);
    }
  },

  //controller for getting all restaurant to the Home Page
  find:async function (req,res) {
      try {
          let restaurents = await Restaurent.find();
          if(restaurents.length===0){
              return res.ok(restaurents)
          }
          return res.ok(restaurents)
      } catch (error) {
          return res.serverError(error)
      }
  },
  
  //controller for getting the specific restaurant to the rsetaurant details Page
  findOne:async function (req,res) {
    try
    {
   
    const foundRestaurent=await Restaurent.findOne({
    id:req.params.id
    });
    if(!foundRestaurent){
        return res.badRequest("no restaurent found")
    }
    return res.ok(foundRestaurent);
    }
    catch(err)
    {
    return res.serverError(err);
}
  },

  //controller for updating the specific restaurant on the add restaurant page
  update:async function (req,res) {
      try {
          let param=req.allParams();
          let updatedRestaurent={}
          if(param.restaurentName){
              updatedRestaurent.restaurentName=param.restaurentName;
          }
          if(param.address){
              updatedRestaurent.address=param.address;
          }
          if(param.phone){
            updatedRestaurent.phone=param.phone;
          }
          if(param.openningTime){
              updatedRestaurent.openningTime=param.openningTime;
          }
          if(param.closingTime){
              updatedRestaurent.closingTime=param.closingTime;
          }
          if(param.lastUpdated){
            updatedRestaurent.lastUpdated=param.lastUpdated;
          }
          if(param.srcImg){
            updatedRestaurent.srcImg=param.srcImg
          }
          if(param.activate){
            updatedRestaurent.activate=param.activate
          }
          else{
            updatedRestaurent.activate=param.activate

          }
          console.log(updatedRestaurent)
          const updation=await Restaurent.update({id:req.params.id},updatedRestaurent)
          
          return res.ok(updation)
      } catch (error) {
          return res.serverError(error)
      }
  },

  
  //controller for deleting the specific restaurant on the add restaurant page
  delete : async function (req,res) {
      try {

        // const restaurent = await Restaurent.findOne({id:req.params.id})
      
       
            const deleted = await Restaurent.destroy({id:req.params.id})
            return res.ok(deleted)
        
         

      } catch (error) {
          return res.serverError(error)
      }
  }
}
