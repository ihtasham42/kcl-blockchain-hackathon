import { utils } from 'ethers';
import omitDeep from 'omit-deep';

export const signedTypeData = (signer, domain, types, value) => {
    //   const signer = wallet.getSigner();
    // remove the __typedname from the signature!
    return signer._signTypedData(
        omitDeep(domain, '__typename'),
        omitDeep(types, '__typename'),
        omitDeep(value, '__typename')
    );
}

export const splitSignature = (signature) => {
    return utils.splitSignature(signature)
}