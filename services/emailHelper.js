const sendEmail = require('../mailer')


async function notifyClient(post, rejectReason = ''){
    const email = post.email

   if(post.status === "accepted"){
    const subject = `Täname! Teie postitus ${post.name} on aksepteeritud`
    const text = `Teie postitus ${post.name} on aksepteeritud ja see on nüüd nähtav meie lehel.`
    await sendEmail(email,subject,text)
   }

   if(post.status === "rejected"){
    const subject = `Kahjuks Teie postitus ${post.name} ei vasta nõuetele`
    const text = rejectReason ? `Teie postitus ${post.name} ei vasta nõuetele. Põhjus: ${rejectReason}` : `Teie postitus ${post.name} ei vasta nõuetele.`
    await sendEmail(email,subject, text)
   }
  
}


module.exports = notifyClient

