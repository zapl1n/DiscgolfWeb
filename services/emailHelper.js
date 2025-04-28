const sendEmail = require('../mailer')


async function notifyClient(post){
    const email = post.email

   if(post.status === "accepted"){
    const text = `Täname! Teie postitus ${post.name} on aksepteeritud`
    await sendEmail(email,text)
   }

   if(post.status === "rejected"){
    const text = `Kahjuks Teie postitus ${post.name} ei vasta nõuetele`
    await sendEmail(email,text)
   }
  
}


module.exports = notifyClient

