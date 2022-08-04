const { CustomerRepository } = require('../db');
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');
const { APIError, BadRequestError } = require('../utils/app-errors');

class CustomerRoute {
  constructor() {
    this.repository = new CustomerRepository();
  }

  async SignIn(userInputs){
    const { email, password } = userInputs;
    try {
      const existingCustomer = await this.repository.FindCustomerByEmail({email})
      if (existingCustomer) {
        const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);
        if (validPassword) {
          const token = await GenerateSignature({email: existingCustomer.email, _id: existingCustomer._id});
          return FormateData({_id: existingCustomer._id, token})
        }
      }
      return FormateData(null);
    } catch (err) {
      throw new APIError('Data Not Found', err)
    }
  }

  async SignUp(userInputs){
    const {email, password, phone} = userInputs;

    try{
      let salt = await GenerateSalt();
      let userPassword = await GeneratePassword(password, salt);
      const existingCustomer = await this.repository.CreateCustomer({email, password: userPassword, phone, salt});
      const token = await GenerateSignature({ email: email, _id: existingCustomer._id});
      return FormateData({ id: existingCustomer._id, token});
    } catch {
      throw new APIError('Data Not Found', err)
    }
  }

  async AddNewAddress(_id, userInputs){
    const {street, postalCode, city, country} = userInputs;
    try {
      const addressResult = await this.repository.CreateAddress({_id, street, postalCode, city, country})
      return FormateData(addressResult)
    } catch { 
      throw new APIError('Data Not Found', err)
    }
  }

  async GetProfile(id){
    try {
      const existingCustomer = await this.repository.FindCustomerById({id});
      return FormateData(existingCustomer);
    } catch (err){
      throw new APIError('Data Not Found', err)
    }
  }

  async GetShoppingDetails(id){
    try {
      const existingCustomer = await this.repository.FindCustomerById({id});
      if (existingCustomer){
        return FormateData(existingCustomer);
      }
      return FormateData({msg: 'Error'});
    } catch {
      throw new APIError('Data Not Found', err)
    }
  }

}