
export enum errorMessageInterface{
  invalidToken  = "400 Invalid Token",
}


export const errorHandler = (error : any) : number => {



  if(error.error.message){

    switch (error.error.message){

      case errorMessageInterface.invalidToken: {
        return 498
      }
    }
  }

  return error.status;

}
