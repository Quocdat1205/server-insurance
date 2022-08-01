import { Injectable } from '@nestjs/common';
import { UserType, User } from '@schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { randomNonce } from 'src/helper/handler';
import { JwtDto } from '@modules/user/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly modelUser: Model<UserType>,
  ) {}

  public async findOneUser(props: JwtDto): Promise<User> {
    const { walletAddress } = props;

    const user = await this.modelUser.findOne({ walletAddress }).exec();

    return user;
  }

  public async createNewUser(props: JwtDto): Promise<User> {
    const { walletAddress } = props;

    const newUser = await new this.modelUser({
      walletAddress,
      nonce: randomNonce(),
    }).save();

    return newUser;
  }

  public async updateNonce(props: JwtDto): Promise<number> {
    const { walletAddress } = props;
    const nonce = randomNonce();

    const updateUser = await this.modelUser
      .findOneAndUpdate({ walletAddress, nonce })
      .exec();

    if (!updateUser) {
      return null;
    }

    return nonce;
  }
}
