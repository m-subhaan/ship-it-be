export interface IMerchantEntity {
    merchantId: string;
    name: string;
    email: string;
    status: string;
    password: string;
    resetPasswordToken: string;
    passwordResetOn: string;
    mobileNumber: string;
    cnic: string;
    address: string;
    idFrontImage: string;
    idBackImage: string;
    bankName: string;
    bankAccountTitle: string;
    bankAccountNumber: string;
}

export interface MerchantEntity extends IMerchantEntity {}

export class MerchantEntity {
    constructor(body: IMerchantEntity) {
        this.merchantId = body.merchantId;
        this.name = body.name ? body.name.trim() : body.name;
        this.email = body.email;
        this.status = body.status;
        this.password = body.password;
        this.resetPasswordToken = body.resetPasswordToken;
        this.passwordResetOn = body.passwordResetOn;
        this.mobileNumber = body.mobileNumber;
        this.cnic = body.cnic;
        this.address = body.address;
        this.idFrontImage = body.idFrontImage;
        this.idBackImage = body.idBackImage;
        this.bankName = body.bankName;
        this.bankAccountTitle = body.bankAccountTitle;
        this.bankAccountNumber = body.bankAccountNumber;
    }

    static create(body: unknown) {
        return new MerchantEntity(body as IMerchantEntity);
    }

    static publicFields(body: unknown): Partial<MerchantEntity> {
        const entity: Partial<MerchantEntity> = new MerchantEntity(body as IMerchantEntity);
        delete entity.password;
        delete entity.passwordResetOn;
        delete entity.resetPasswordToken;

        return entity;
    }
}
