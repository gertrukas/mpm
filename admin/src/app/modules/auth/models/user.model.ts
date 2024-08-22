import { AuthModel } from './auth.model';
import { AddressModel } from './address.model';
import { SocialNetworksModel } from './social-networks.model';

export class UserModel extends AuthModel {
  id: string;
  name: string;
  password: string;
  email: string;
  role: string;
  image: string;
  active: boolean;
  delete: boolean;
  // email settings
  emailSettings?: {
    emailNotification: boolean;
    sendCopyToPersonalEmail: boolean;
    activityRelatesEmail: {
      youHaveNewNotifications: boolean;
      youAreSentADirectMessage: boolean;
      someoneAddsYouAsAsAConnection: boolean;
      uponNewOrder: boolean;
      newMembershipApproval: boolean;
      memberRegistration: boolean;
    };

  };

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.id = user.id;
    this.name = user.name || '';
    this.password = user.password || '';
    this.email = user.email || '';
    this.image = user.image || './assets/media/users/default.jpg';
    this.role = user.role || '';
    this.active = user.active || true;
    this.delete = user.delete || false;
  }
}
