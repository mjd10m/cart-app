const { Schema, model, SchemaTypes } = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new Schema (
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }    
)
userSchema.pre('save', async function(next){
  if(this.isNew || this.isModified('password')) {
    const saltRounds = 10
    this.password = await bcrypt.hash(this.password, saltRounds)
  }
})

userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password)
}

const User = model('User', userSchema)

module.exports = User