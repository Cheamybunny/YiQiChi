import React from "react";
<<<<<<< HEAD
import { View, Text, ScollView, Image, StyleSheet, TouchableOpacity } from "react-native";
=======
import { View, Text, ScollView, Image, StyleSheet, TouchableOpacity} from "react-native";
>>>>>>> 035195d879b278caf347a0b24208a40b59027e82
import { Divider } from  'react-native-elements'
import images from "../../images";
const Post = ({ post }) => {
    return (
        <View style={{ marginBottom: 30}}>
            <Divider width={1} orientation='vertical' />
            <PostHeader post={ post } />
            <PostImage post={ post } />
            <View style={{ marginHorizontal: 15, marginTop: 10,}}>
                <PostFooter/>
                <Likes post={ post } />
                <Caption post={ post }/>
                <CommentSection post={ post}/>
                <Comments post={post}/>
            </View>
        </View>
    )
}

const PostHeader = ({ post }) => (
    <View style= {styles.postHeader}>
        <View style={ {flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{ uri: post.profile_picture}} style={styles.story}/>
            <Text style ={{ color: 'black', marginLeft: 5, fontWeight: '700'}}>{post.user}</Text> 
        </View>
    </View>
)

const PostImage = ({ post }) => (
    <View 
        style ={{
            width: '100%',
            height: 450,
        }}>
        <Image
            source={{uri: post.imageURL}}
            style={{ height: '100%', resizeMode: 'cover' }}
        />
    </View>
)

const PostFooter = () => (
    <View style={{ flexDirection: 'row'}}>
        <View style={styles.leftFooter}>
            <Icon imgStyle={styles.footerIcon} source={images.like}/>
            <Icon imgStyle={styles.footerIcon} source={images.comment}/>
        </View>
        <View style={styles.rightFooter}>
            <Icon imgStyle={styles.footerIcon} source={images.bookmark}/>
        </View>
    </View>
)

const Icon = ({imgStyle, source}) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={source}/>
    </TouchableOpacity>
)

const Likes = ({post}) => (
    <View style={{flexDirection: 'row', marginTop: 4}}>
        <Text style={{fontWeight: '600'}}>{post.likes.toLocaleString('en')} likes</Text>
    </View>
)

const Caption = ({post}) => (
    <View style={{marginTop: 5}}>
        <Text>
            <Text style={{fontWeight: '600'}}>{post.user} </Text>
            <Text>{post.caption}</Text>
        </Text>
    </View>
)

const CommentSection = ({post}) => (
    <View style={{ marginTop: 5 }}>
        {post.comments.length > 0 && (       
            <Text style={{color:'grey'}}>
                View {post.comments.length > 1 ? 'all' : ''} {post.comments.length}{' '}
                {post.comments.length > 1 ? 'comments' : 'comment'}
            </Text>
        )}
    </View> 
)

const Comments = ({post}) => (
    <>
        {
            post.comments.map((comment, index) => (
                <View key={index} style={{flexDirection: 'row', marginTop: 5}}>
                    <Text>
                        <Text style={{fontWeight: '600', }}>{comment.user}</Text>
                        <Text> {comment.comment}</Text>
                    </Text>
                </View>

            ))
        }
    </>
)
const styles = StyleSheet.create({
    postHeader: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 5,
        allignItems: 'center',
    },

    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: '#ff8501',
    },

    footerIcon: {
        width: 33,
        height: 33,
    },

    leftFooter: {
        flexDirection: 'row',
        width: '22%',
        justifyContent: 'space-between',
    },
    rightFooter: {
        flex: 1,
        alignItems: 'flex-end',
    }
})
export default Post