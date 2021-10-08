const  { Schema, model } = require('mongoose')

const course = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  url: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

course.method('toClient', function() {
  const course = this.toObject()
  course.id = course._id
  delete course._id
})

module.exports = model('Course', course)






























// const {v4: uuidv4 } = require('uuid')
// const fs = require('fs')
// const path = require('path')
// class Course {
//   constructor(title, price, url) {
//     this.title = title
//     this.price = price
//     this.url = url
//     this.id = uuidv4()
//   }
// toJSON() {
//     return {
//       title: this.title,
//       price: this.price,
//       url: this.url,
//       id: this.id
//     }
// }
//   async save() {
//     const courses = await Course.getAll()
//     courses.push(this.toJSON())
//     console.log("Courses", courses);
//     return new Promise( (resolve, reject) => {
//       fs.writeFile(
//         path.join(__dirname,'..', 'data', 'courses.json'),
//         JSON.stringify(courses),
//         (err) => {
//           if(err) {
//             reject(err)
//           }else {
//             resolve()
//           }
//         }
//       )
//     })
//
//   }
//
//   static getAll() {
//     return new Promise((resolve, reject) => {
//       fs.readFile(
//         path.join(__dirname, '..', 'data', 'courses.json'),
//         'utf-8',
//         (err, content) => {
//           if(err) {
//             reject(err)
//           }else {
//             resolve(JSON.parse(content))
//           }
//         }
//       )
//     })
//   }
//
//   static async getById(id) {
//    const courses = await Course.getAll()
//     return courses.find ( c => c.id === id)
//   }
//   static async update (course) {
//     const courses = await Course.getAll()
//     const idx = courses.findIndex(c => c.id === course.id)
//     courses[idx] = course
//     return new Promise( (resolve, reject) => {
//       fs.writeFile(
//         path.join(__dirname,'..', 'data', 'courses.json'),
//         JSON.stringify(courses),
//         (err) => {
//           if(err) {
//             reject(err)
//           }else {
//             resolve()
//           }
//         }
//       )
//     })
//   }
//
// }
//
// module.exports = Course
