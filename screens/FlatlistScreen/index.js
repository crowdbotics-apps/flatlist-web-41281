import React, { useState, useEffect } from "react"
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Dimensions,
  Platform
} from "react-native"

const FlatlistScreen = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // An initial data is given to flatlist consisiting of 25 items.
    const initialData = Array.from({ length: 25 }, (_, index) => ({
      id: index,
      name: `Item ${index + 1}`
    }))
    setData(initialData)
  }, [])

  const handleLoadMore = () => {
    // 10 more items are added while also keeping the previous ones after every 1500ms.
    if (!isLoading) {
      setIsLoading(true)
      setTimeout(() => {
        const newData = Array.from({ length: 10 }, (_, index) => ({
          id: data.length + index,
          name: `Item ${data.length + index + 1}`
        }))
        setData(prevData => [...prevData, ...newData])
        setIsLoading(false)
      }, 1500)
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View style={{ padding: 16 }}>
        <Text>{item.name}</Text>
      </View>
    )
  }
  const { height } = Dimensions.get("window")

  const renderFooter = () => {
    return (
      <View style={{ paddingVertical: 20 }}>
        {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      </View>
    )
  }

  return (
    <View
      style={{
        // height is given only for web platfrom because in a browser, you can't detect the endOfScrollReached event if a static height is not given and then on top it we are detecting 64px from the it to deduct the height of the top header bar. i.e. heightGiven = windowHeight - navbarHeight, because we are only considering the actual scrollable content's height i.e. FlatList
        height: Platform.OS === "web" ? height - 64 : "100%",
        overflow: "hidden"
      }}
    >
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => handleLoadMore()} // Called once when the scroll position gets within onEndReachedThreshold of the rendered content.
        onEndReachedThreshold={0.5} // How far from the end (in units of visible length of the list) the bottom edge of the list must be from the end of the content to trigger the onEndReached callback
        ListFooterComponent={renderFooter} // Rendered at the bottom of all the items
        showsVerticalScrollIndicator={false} // Pass false if you want to hide intenal scrollbar
      />
    </View>
  )
}

export default FlatlistScreen
