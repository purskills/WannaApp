import { 
  createStackNavigator, 
  createAppContainer, 
  createSwitchNavigator, 
  createBottomTabNavigator 
} from 'react-navigation'
import { 
  Login, 
  ChooseType, 
  ChooseInterests, 
  FollowPeople, 
  FollowBrands,
  Feed,
  Comments,
  Messages,
  UserProfile,
  Camera,
  Compose,
  Invite,
  Location,
  ChatRoom,
  UserFollow,
  BrandFollow,
  Followers
} from 'screens';
import { w, h, m } from 'common/helpers';
import { Image } from 'react-native';
import { Icon } from 'native-base';
import images from 'images';
import React from 'React';

const AuthNavigation = createStackNavigator({
    LoginScreen: { screen: Login },
    ChooseTypeScreen: { screen:ChooseType },
    ChooseInterestsScreen: { screen: ChooseInterests },
    FollowPeopleScreen: { screen: FollowPeople },
    FollowBrandsScreen: { screen: FollowBrands }
  }, 
  {
    initialRouteName: "LoginScreen",
    headerMode: 'none'
  }
);

const HomeNavigation = createStackNavigator({
    FeedScreen: { screen: Feed },
    CommentsScreen: { screen: Comments },
    MessagesScreen: { screen: Messages },
    ChatRoomScreen: { screen: ChatRoom },
    UserFollowScreen: { screen: UserFollow },
    BrandFollowScreen: { screen: BrandFollow },
    FollowersScreen: { screen: Followers }
    // CameraScreen: { screen: Camera }
  }, 
  {
    initialRouteName: 'FeedScreen',
    headerMode: 'none'
  }
);
const UserNavigation = createStackNavigator({
    ProfileScreen: { screen: UserProfile },
    MessagesScreen: { screen: Messages },
    ChatRoomScreen: { screen: ChatRoom },
  },
  {
    initialRouteName: 'ProfileScreen',
    headerMode: 'none'
  }
  
);
const CameraNavigation = createStackNavigator({
    CameraScreen: { screen: Camera },
    ComposeScreen: { screen: Compose },
    InviteScreen: { screen: Invite },
    LocationScreen: { screen: Location}
  },
  {
    initialRouteName: 'CameraScreen',
    headerMode: 'none'
  }
);

const MainNavigation = createBottomTabNavigator(
  {
    /* navigationOptions: { tabBarVisible: false} */
    Home: HomeNavigation ,
    // Location: HomeNavigation,
    Main: {
      screen: Camera,
      navigationOptions: { 
        tabBarVisible: false
      }
    },
    // Notification: HomeNavigation ,
    User: UserNavigation,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let image = '';
        let width = 0, height = 0;
        
        switch (routeName) {
          case 'Home':
            image = focused ? 'tabIcon_home_active' : 'tabIcon_home';
            width = m(18);
            height = m(20);
            break;
          case 'Location':
            image = 'tabIcon_location';
            width = m(17);
            height = m(21);
            break;
          case 'Main':
            image = 'tabIcon_main';
            width = m(30);
            height = m(30);
            break;
          case 'Notification':
            image = 'tabIcon_notification';
            width = m(17);
            height = m(20);
            break;
          case 'User':
            image = focused ? 'tabIcon_user_active' : 'tabIcon_user';
            width = m(20);
            height = m(21);
            break;
          default:
            break;
        }

        return (
          <Image 
            source={images[image]}
            style ={{
              width: width,
              height: height
            }}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FF6F00',
      inactiveTintColor: '#263238',
      showLabel: false
    },
  }
);

const AppNavigator = createSwitchNavigator({
  Auth: AuthNavigation,
  Main: MainNavigation,
  Camera: CameraNavigation
});

export default createAppContainer(AppNavigator);