<!--
 * @Author: lxx1997 lujiangpeng@vipinfo.com.cn
 * @Date: 2023-03-13 11:02:10
 * @LastEditors: lxx1997 lujiangpeng@vipinfo.com.cn
 * @LastEditTime: 2023-03-14 15:27:31
 * @FilePath: \unified_retrieval_sys\src\components\web\model\search-detail\reader-comments\readcomment.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: lxx1997 lujiangpeng@vipinfo.com.cn
 * @Date: 2023-03-06 14:46:31
 * @LastEditors: lxx1997 lujiangpeng@vipinfo.com.cn
 * @LastEditTime: 2023-03-13 11:08:21
 * @FilePath: \readercomment\src\views\admin\comment\readcomment.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<!-- 读者评论 评论+评分 仅评论 仅评分  【组件】 -->
<template>
  <div class="template1 common-bg-grey"  v-if="ReaderCommentConfig.isOn">
    <!-- h1 读者评论 标题 -->
    <div class="readComment">
      <div class="readerComments tbefore-bg-c1">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAYlJREFUOE+t1D1LA0EQBuB3/oKlhVhZmF1CiKm0ENHGRrCzs0pnQBDUyjQWKlgYf4ClIoIIImjESgRRkOwMpLAQxE6wsMzByIa7I4kxlw+nm7vZ52Y/bgn/HJTkWWuzALKqGgB4YuZKpzFtQWvtrKoWAEwCGGoBPgE8ENGBc67cijeB6XR6LAiCTSJaTurcv1fVIwDbIvIa1TeB1tpbVZ3pBotqVPVKROZ/gcaYIoCtXrAYIdpwzu34vN5hJpMZrtVqH/1gDWNGmPm9DlprF1T1fBBQVZdE5LgOGmP2AKw1gKeq+kVE+fBZUu436FBEViLwEkC8sMwcPVcPJuXhjl+IyEI05X1VXR2ww3UR2Y06WQRwNuAaTonIfXwOjTGPAHJ9omVmnouPTbgx0wDu+gGJaMI599wE+iSVSuWIyHfaSxSYudT21wvRcSKSLsQTVS35dWusbXvbGGPqxyWMFwCjAL4B+MF+ahVmvm730U7gTRAE+Wq1+tZFt3HJX2CRmf1l0XMk3ti9ij+s7r0VPZJG+gAAAABJRU5ErkJggg=="
        />
        <span data-v-8c52445a="">读者评论</span>
      </div>
      <!-- 整体评分 -->
      <div
        class="over-globalScoring"
        v-if="
          ReaderCommentConfig.isOn && ReaderCommentConfig.isDisplayTotalScore
        "
      >
        <div class="globalScoring tbefore-bg-c1">
          <div
            style="display: flex;align-items: center;margin-right: 5px;"
            v-if="
              ReaderCommentConfig.isOn &&
                ReaderCommentConfig.isDisplayTotalScore
            "
          >
            <span class="globalScoringTxt">整体评分</span>
            <!-- v-model="ReaderCommentList.overallRating_Out" -->
            <el-rate
              class="tfont-c5 tbefore-font-c2"
              disabled-icon-class="tfont-c5 el-icon-star-on"
              v-model="ReaderCommentList.overallRating_Out"
              :icon-classes="[
                'tfont-c5 el-icon-star-on',
                'tfont-c5 el-icon-star-on',
                'tfont-c5 el-icon-star-on'
              ]"
              disabled
              allow-half="true"
              disabled-void-color="#BFBFBF"
              show-score
              score-template="{value}"
            >
            </el-rate>
          </div>
          <div
            style="display: flex;align-items: center;margin-right: 5px;"
            v-if="
              ReaderCommentConfig.isOn && ReaderCommentConfig.scoreColumn == '1'
            "
          >
            <span class="fengexian">|</span>
            <span class="scoringCount" v-if="denglutype"
              >{{
                MyCommentList.myScore != 0
                  ? ReaderCommentList.scoreCount_Out + 1
                  : ReaderCommentList.scoreCount_Out
              }}人评分</span
            >
            <span class="scoringCount" v-else
              >{{ ReaderCommentList.scoreCount_Out }}人评分</span
            >
          </div>
        </div>
      </div>
      <!-- 评论框 -->
      <div
        class="commentBox"
        v-if="
          ReaderCommentConfig.isOn &&
            ReaderCommentConfig.isCanComment &&
            (this.ReaderCommentConfig.type == 2 ||
              this.ReaderCommentConfig.type == 3)
        "
      >
        <div id="wangEditor"></div>
        <!-- <el-button class="pubComment" type="primary">发布</el-button> -->
        <button
          class="pubComment tbg-c1 thover-bg-c2"
          @click="pubMyComment"
          v-clickWithAuthLogin="collect"
        >
          发布
        </button>
        <div class="hr"></div>
      </div>
      <!-- 我的评分 -->
      <div
        class="myComScore"
        v-if="
          ReaderCommentConfig.isOn &&
            ReaderCommentConfig.isDisplayTotalScore &&
            denglutype
        "
      >
        <div class="div1">
          <span class="myScore">我的评分</span>
          <!-- v-model="MyCommentList.myScore" -->
          <div v-if="MyCommentList.myScore != 0">
            <el-rate
              class="tfont-c5 tbefore-font-c2"
              disabled-icon-class="tfont-c5 el-icon-star-on"
              v-model="MyCommentList.myScore"
              :icon-classes="[
                'tfont-c5 el-icon-star-on',
                'tfont-c5 el-icon-star-on',
                'tfont-c5 el-icon-star-on'
              ]"
              disabled
              allow-half="true"
              disabled-void-color="#BFBFBF"
              show-score
              score-template="{value}"
            >
            </el-rate>
            <!-- <el-rate
              v-model="MyCommentList.myScore"
              void-color="#e4e4e4"
              show-score
              :icon-classes="[
                'tfont-c5 el-icon-star-on',
                'tfont-c5 el-icon-star-on',
                'tfont-c5 el-icon-star-on'
              ]"
              allow-half="true"
              disabled
              disabled-void-icon-class="tbg-c1"
              void-icon-class="el-icon-star-on"
              score-template="{value}"
            ></el-rate> -->
          </div>
          <div v-else>
            <el-rate
              v-model="MyCommentList.myScore"
              void-color="#e4e4e4"
              show-score
              @change="myScore($event)"
              :icon-classes="[
                'tfont-c5 el-icon-star-on',
                'tfont-c5 el-icon-star-on',
                'tfont-c5 el-icon-star-on'
              ]"
              disabled-void-icon-class="tbg-c1"
              void-icon-class="el-icon-star-on"
              score-template="{value}"
            ></el-rate>
          </div>
          <button
            class="delComment tbg-c1"
            v-if="MyCommentList.myScore"
            @click="deleteMyScore"
          >
            删除评分
          </button>
        </div>
        <div class="hr"></div>
      </div>
      <!-- 我的评论 -->
      <div
        class="myComments"
        v-if="
          ReaderCommentConfig.isOn &&
            ReaderCommentConfig.isCanComment &&
            (this.ReaderCommentConfig.type == 2 ||
              this.ReaderCommentConfig.type == 3) &&
            denglutype
        "
      >
        <span class="myCommentTit">我的评论</span>
        <div class="commentsContent" v-if="MyCommentList.items.length > 0">
          <!-- 在此 循环 渲染 我的评论 -->
          <div v-for="(item, index) in MyCommentList.items" :key="index">
            <div class="commentsContent-item">
              <div class="item-content">
                <!-- 我的评论 内容 -->
                <div class="item-info">
                  <pre v-html="item.content"></pre>
                </div>
                <!-- 我的评论时间 和 删除此评论 按钮 -->
                <div>
                  <span class="commentTime">{{ item.createTime }}</span>
                  <a class="item-delete tfont-c1" @click="delMyComment(item)"
                    >删除</a
                  >
                </div>
              </div>
              <!-- 点赞 和 回复按钮 -->
              <div class="zanAhuifu">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAY5JREFUOE+t1LFLI0EUBvBvXuwPhBSnpddaaSWS7JekuYMgXHEogljE5g6uE+yMnb1wnCD4Dxx3cIUEJPPGCCm0F9JZ2hpQISQZmRAFo+wa3el25+1v3rx9MwYpD/Mazzn3XURcLpe7SIqPBZvN5mSn06l5728AZDOZzLckNBZU1VUAFZJ0zu0DmI2iaCEuy1iwXq9XRSQfQFWNACjJ2G+SMtwDMEPyi7X2p4gsvznDRqOR7fV6ZwD+kNxU1QPvfdsY8390y6EiD+9ezFBV1733BWPMZ+/9YqFQaKmqAgjbfmlcisiPfD5/NACttUsi8st7P/W4kjHNbrdbLZVKx0mtoqqHALokNwbgcPWQ9kl4BDD4sUnQw7yq/gbwgeTKE5Dkjqr6N4Ch1n9J7r4bVNUJAHcAyiRraYDzAM4BfCR5lQZYAbBF8lOoaRpgaP5pkl/TAk/7/X69WCxW3w1aa+eMMc4YsxZF0b9HcHgJbL+270biXGjaZ0dveJuMZYrIdbvdbpXL5dvYszyWOhJ8Dw++3xVgFO5vAAAAAElFTkSuQmCC"
                />
                <span>{{ item.likeCount }}</span>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAASBJREFUOE+9lLFOwzAQhn87QihvwILUkZERJviVISMSAmZAYkEsiAdou7c8AwsTe7bIyUswMfASHbLcIZe4ohI0JqrixZL9+7vfdz4bbHkYz3POnQI4A3DYk/8B4JVkFYBPAGYiMu0DTJLkTlWfSc4D0IlInWXZpA+wLMuJtfaEJIcBtjntNOtz5kUbHbab407at+CN5NXwV450t5IN67CqqktVve9weUPyM2g2Oqzrel9EbkXEWGvVzz/hfo3kWgMMe+X/FqTzHW4F2ObgAsCDMWbRNM17nueLoih20zQ9jggyDn9B6OURAN8d1/6wMeYcwJGqPgLYiQC+AJj6yq9VsP0bHYADAHsAVsII6FLyF9C/sWXEWFDQ/QYc9QEF4BdJEu4VaIErKgAAAABJRU5ErkJggg=="
                />
                <span>{{ item.replyCount }}</span>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
      <!-- <div style="margin-top: 100px;">
      <div class="globalCommentInfo">
        <div class="comPeople">
          <img
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            alt=""
          />
          <div>
            <div class="othersComHeader">
              <span class="othersName">浪迹天涯的二腿子</span>
              <span class="othersComTime">2022年05月20日 12:12:12</span>
            </div>
          </div>
        </div>
      </div>
    </div> -->
      <!-- <div id="text"></div> -->
    </div>
    <!-- h1 全部评论 -->
    <div
      class="allComments"
      v-if="
        ReaderCommentConfig.isOn &&
          ReaderCommentConfig.isContent &&
          (this.ReaderCommentConfig.type == 2 ||
            this.ReaderCommentConfig.type == 3)
      "
    >
      <div class="title">
        <span>全部评论</span>
        <button class="commentsCouts">
          共{{ ReaderCommentList.commentCount_Out }}条评论
        </button>
      </div>
      <!-- 在此循环 渲染 每条他人评论 -->
      <div
        class="main-comments"
        v-for="(item, index) in ReaderCommentList.items"
        :key="index"
      >
        <!-- 主评论人 头像 -->
        <div class="touxiang">
          <!-- <img
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            alt=""
          /> -->
          <img :src="fileUrl + item.userImage" />
        </div>
        <div class="section-comments">
          <!-- 主评论 -->
          <div class="comments-info">
            <div>
              <div class="nameTime">
                <!-- 主评论人 姓名 -->
                <span>{{ item.userName }}</span>
                <!-- 评论时间 -->
                <span class="commentTime">{{ item.createTime }}</span>
              </div>
              <!-- 主评论 内容 -->
              <pre v-html="item.content"></pre>
            </div>
            <!-- 点赞 和 回复 按钮 -->
            <div class="zanAhuifu">
              <img
                @click="LikeComment(item)"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAY5JREFUOE+t1LFLI0EUBvBvXuwPhBSnpddaaSWS7JekuYMgXHEogljE5g6uE+yMnb1wnCD4Dxx3cIUEJPPGCCm0F9JZ2hpQISQZmRAFo+wa3el25+1v3rx9MwYpD/Mazzn3XURcLpe7SIqPBZvN5mSn06l5728AZDOZzLckNBZU1VUAFZJ0zu0DmI2iaCEuy1iwXq9XRSQfQFWNACjJ2G+SMtwDMEPyi7X2p4gsvznDRqOR7fV6ZwD+kNxU1QPvfdsY8390y6EiD+9ezFBV1733BWPMZ+/9YqFQaKmqAgjbfmlcisiPfD5/NACttUsi8st7P/W4kjHNbrdbLZVKx0mtoqqHALokNwbgcPWQ9kl4BDD4sUnQw7yq/gbwgeTKE5Dkjqr6N4Ch1n9J7r4bVNUJAHcAyiRraYDzAM4BfCR5lQZYAbBF8lOoaRpgaP5pkl/TAk/7/X69WCxW3w1aa+eMMc4YsxZF0b9HcHgJbL+270biXGjaZ0dveJuMZYrIdbvdbpXL5dvYszyWOhJ8Dw++3xVgFO5vAAAAAElFTkSuQmCC"
              />
              <span @click="LikeComment(item)">{{ item.likeCount }}</span>
              <img
                @click="othComReplyShowFn(item, index)"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAASBJREFUOE+9lLFOwzAQhn87QihvwILUkZERJviVISMSAmZAYkEsiAdou7c8AwsTe7bIyUswMfASHbLcIZe4ohI0JqrixZL9+7vfdz4bbHkYz3POnQI4A3DYk/8B4JVkFYBPAGYiMu0DTJLkTlWfSc4D0IlInWXZpA+wLMuJtfaEJIcBtjntNOtz5kUbHbab407at+CN5NXwV450t5IN67CqqktVve9weUPyM2g2Oqzrel9EbkXEWGvVzz/hfo3kWgMMe+X/FqTzHW4F2ObgAsCDMWbRNM17nueLoih20zQ9jggyDn9B6OURAN8d1/6wMeYcwJGqPgLYiQC+AJj6yq9VsP0bHYADAHsAVsII6FLyF9C/sWXEWFDQ/QYc9QEF4BdJEu4VaIErKgAAAABJRU5ErkJggg=="
              />
              <span @click="othComReplyShowFn(item, index)">{{
                item.replyCount
              }}</span>
            </div>
          </div>
          <!-- 主评论 点击 回复 显示回复框 -->
          <div class="textarea-reply" v-if="item.othComReplyShow">
            <!-- <textarea></textarea> -->
            <div id="wangEditorR"></div>
            <button @click="weReply(item)" v-clickWithAuthLogin="collect">
              回复
            </button>
            <!-- <input type="text">
            <button>回复</button> -->
          </div>
          <!-- 主评论下的所有回复 -->
          <div class="comments-reply" v-if="item.replyList.length > 0">
            <!-- 在此循环 渲染 每条他人评论下的回复内容 -->
            <div v-for="(items, indexs) in item.replyList" :key="indexs">
              <div class="comReply-item">
                <div class="touxiang">
                  <!-- <img
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    alt=""
                  /> -->
                  <img :src="fileUrl + item.userImage" />
                </div>
                <div class="comReply-content">
                  <div class="namTime">
                    <span class="zhudong">{{ items.userName }}</span>
                    <span class="huifu">回复</span>
                    <span class="beidong">{{ items.replyTo }}</span>
                    <span class="time">{{ items.createTime }}</span>
                  </div>
                  <div class="reply-info">
                    <pre>{{ items.content }}</pre>
                  </div>
                </div>
                <div class="zanAhuifu">
                  <!-- items.userImage -->
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAY5JREFUOE+t1LFLI0EUBvBvXuwPhBSnpddaaSWS7JekuYMgXHEogljE5g6uE+yMnb1wnCD4Dxx3cIUEJPPGCCm0F9JZ2hpQISQZmRAFo+wa3el25+1v3rx9MwYpD/Mazzn3XURcLpe7SIqPBZvN5mSn06l5728AZDOZzLckNBZU1VUAFZJ0zu0DmI2iaCEuy1iwXq9XRSQfQFWNACjJ2G+SMtwDMEPyi7X2p4gsvznDRqOR7fV6ZwD+kNxU1QPvfdsY8390y6EiD+9ezFBV1733BWPMZ+/9YqFQaKmqAgjbfmlcisiPfD5/NACttUsi8st7P/W4kjHNbrdbLZVKx0mtoqqHALokNwbgcPWQ9kl4BDD4sUnQw7yq/gbwgeTKE5Dkjqr6N4Ch1n9J7r4bVNUJAHcAyiRraYDzAM4BfCR5lQZYAbBF8lOoaRpgaP5pkl/TAk/7/X69WCxW3w1aa+eMMc4YsxZF0b9HcHgJbL+270biXGjaZ0dveJuMZYrIdbvdbpXL5dvYszyWOhJ8Dw++3xVgFO5vAAAAAElFTkSuQmCC"
                  />
                  <span>{{ items.likeCount }}</span>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAASBJREFUOE+9lLFOwzAQhn87QihvwILUkZERJviVISMSAmZAYkEsiAdou7c8AwsTe7bIyUswMfASHbLcIZe4ohI0JqrixZL9+7vfdz4bbHkYz3POnQI4A3DYk/8B4JVkFYBPAGYiMu0DTJLkTlWfSc4D0IlInWXZpA+wLMuJtfaEJIcBtjntNOtz5kUbHbab407at+CN5NXwV450t5IN67CqqktVve9weUPyM2g2Oqzrel9EbkXEWGvVzz/hfo3kWgMMe+X/FqTzHW4F2ObgAsCDMWbRNM17nueLoih20zQ9jggyDn9B6OURAN8d1/6wMeYcwJGqPgLYiQC+AJj6yq9VsP0bHYADAHsAVsII6FLyF9C/sWXEWFDQ/QYc9QEF4BdJEu4VaIErKgAAAABJRU5ErkJggg=="
                  />
                  <span>1</span>
                </div>
              </div>
              <hr />
            </div>
            <span
              v-if="item.replyList >= 2"
              @click="showcommentsDialog(item)"
              class="seemore tfont-c5"
              >查看更多回复></span
            >
          </div>
        </div>
      </div>
      <div style="display: flex;justify-content: center;">
        <el-pagination
          v-if="allComPageData.totalCount > 0"
          @current-change="handleCurrentChange1($event)"
          :pager-count="5"
          :current-page="allComPageData.pageIndex"
          :page-sizes="pageSizes"
          :page-size="allComPageData.pageSize"
          layout="prev, pager, next"
          :total="allComPageData.totalCount"
        ></el-pagination>
      </div>
    </div>

    <div
      class="commentsDialog"
      v-if="commentsDialogShow"
      @click="commentDialogClose($event)"
    >
      <div class="commentsDialog-body" @click="$event.stopPropagation()">
        <div class="commentsDialog-header">
          <span>评论详情</span>
          <i class="el-icon-close" @click="commentDialogClose($event)"></i>
        </div>
        <hr />
        <div class="commentsDialog-content">
          <div class="comments">
            <div class="touxiang">
              <img
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                alt=""
              />
            </div>
            <div class="comment-content">
              <div class="namTime">
                <span class="zhudong">{{ commentsDlgData.userName }}</span>
                <!-- <span class="huifu">回复</span> -->
                <!-- <span class="beidong">二狗子</span> -->
                <span class="time">{{ commentsDlgData.createTime }}</span>
              </div>
              <div class="reply-info">
                <pre v-html="commentsDlgData.content"></pre>
              </div>
            </div>
            <div class="zanAhuifu">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAY5JREFUOE+t1LFLI0EUBvBvXuwPhBSnpddaaSWS7JekuYMgXHEogljE5g6uE+yMnb1wnCD4Dxx3cIUEJPPGCCm0F9JZ2hpQISQZmRAFo+wa3el25+1v3rx9MwYpD/Mazzn3XURcLpe7SIqPBZvN5mSn06l5728AZDOZzLckNBZU1VUAFZJ0zu0DmI2iaCEuy1iwXq9XRSQfQFWNACjJ2G+SMtwDMEPyi7X2p4gsvznDRqOR7fV6ZwD+kNxU1QPvfdsY8390y6EiD+9ezFBV1733BWPMZ+/9YqFQaKmqAgjbfmlcisiPfD5/NACttUsi8st7P/W4kjHNbrdbLZVKx0mtoqqHALokNwbgcPWQ9kl4BDD4sUnQw7yq/gbwgeTKE5Dkjqr6N4Ch1n9J7r4bVNUJAHcAyiRraYDzAM4BfCR5lQZYAbBF8lOoaRpgaP5pkl/TAk/7/X69WCxW3w1aa+eMMc4YsxZF0b9HcHgJbL+270biXGjaZ0dveJuMZYrIdbvdbpXL5dvYszyWOhJ8Dw++3xVgFO5vAAAAAElFTkSuQmCC"
              />
              <span>{{ commentsDlgData.likeCount }}</span>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAASBJREFUOE+9lLFOwzAQhn87QihvwILUkZERJviVISMSAmZAYkEsiAdou7c8AwsTe7bIyUswMfASHbLcIZe4ohI0JqrixZL9+7vfdz4bbHkYz3POnQI4A3DYk/8B4JVkFYBPAGYiMu0DTJLkTlWfSc4D0IlInWXZpA+wLMuJtfaEJIcBtjntNOtz5kUbHbab407at+CN5NXwV450t5IN67CqqktVve9weUPyM2g2Oqzrel9EbkXEWGvVzz/hfo3kWgMMe+X/FqTzHW4F2ObgAsCDMWbRNM17nueLoih20zQ9jggyDn9B6OURAN8d1/6wMeYcwJGqPgLYiQC+AJj6yq9VsP0bHYADAHsAVsII6FLyF9C/sWXEWFDQ/QYc9QEF4BdJEu4VaIErKgAAAABJRU5ErkJggg=="
              />
              <span>{{ commentsDlgData.replyCount }}</span>
            </div>
          </div>
          <div class="reply-count tbg-lin-c1-90-2_1 tfont-c1">
            <span>{{ commentsDlgData.replyCount }}条回复</span>
            <span>按回复时间倒序排列</span>
          </div>
          <div
            class="reply-main"
            v-for="(item, index) in commentsDlgData.data.replies"
            :key="index"
          >
            <div class="replys">
              <div class="touxiang">
                <img
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                />
              </div>
              <div class="comment-content">
                <div class="namTime">
                  <span class="zhudong">{{ item.userName }}</span>
                  <span class="huifu">回复</span>
                  <span class="beidong">{{ item.replyTo }}</span>
                  <span class="time">{{ item.createTime }}</span>
                </div>
                <div class="reply-info">
                  <pre>{{ item.content }}</pre>
                </div>
              </div>
              <div class="zanAhuifu">
                <!-- <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAY5JREFUOE+t1LFLI0EUBvBvXuwPhBSnpddaaSWS7JekuYMgXHEogljE5g6uE+yMnb1wnCD4Dxx3cIUEJPPGCCm0F9JZ2hpQISQZmRAFo+wa3el25+1v3rx9MwYpD/Mazzn3XURcLpe7SIqPBZvN5mSn06l5728AZDOZzLckNBZU1VUAFZJ0zu0DmI2iaCEuy1iwXq9XRSQfQFWNACjJ2G+SMtwDMEPyi7X2p4gsvznDRqOR7fV6ZwD+kNxU1QPvfdsY8390y6EiD+9ezFBV1733BWPMZ+/9YqFQaKmqAgjbfmlcisiPfD5/NACttUsi8st7P/W4kjHNbrdbLZVKx0mtoqqHALokNwbgcPWQ9kl4BDD4sUnQw7yq/gbwgeTKE5Dkjqr6N4Ch1n9J7r4bVNUJAHcAyiRraYDzAM4BfCR5lQZYAbBF8lOoaRpgaP5pkl/TAk/7/X69WCxW3w1aa+eMMc4YsxZF0b9HcHgJbL+270biXGjaZ0dveJuMZYrIdbvdbpXL5dvYszyWOhJ8Dw++3xVgFO5vAAAAAElFTkSuQmCC"
                /> -->
                <img :src="fileUrl + item.userImage" />
                <span>{{ item.likeCount }}</span>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAASBJREFUOE+9lLFOwzAQhn87QihvwILUkZERJviVISMSAmZAYkEsiAdou7c8AwsTe7bIyUswMfASHbLcIZe4ohI0JqrixZL9+7vfdz4bbHkYz3POnQI4A3DYk/8B4JVkFYBPAGYiMu0DTJLkTlWfSc4D0IlInWXZpA+wLMuJtfaEJIcBtjntNOtz5kUbHbab407at+CN5NXwV450t5IN67CqqktVve9weUPyM2g2Oqzrel9EbkXEWGvVzz/hfo3kWgMMe+X/FqTzHW4F2ObgAsCDMWbRNM17nueLoih20zQ9jggyDn9B6OURAN8d1/6wMeYcwJGqPgLYiQC+AJj6yq9VsP0bHYADAHsAVsII6FLyF9C/sWXEWFDQ/QYc9QEF4BdJEu4VaIErKgAAAABJRU5ErkJggg=="
                />
                <span>{{ item.replyCount }}</span>
              </div>
            </div>
            <hr />
          </div>
          <!-- <img
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          /> -->
        </div>
        <div class="commentsDialog-footer">
          <!-- <div> -->
          <div class="paging-page">
            <el-pagination
              @current-change="handleCurrentChange"
              :pager-count="5"
              :current-page="pageData.pageIndex"
              :page-sizes="pageSizes"
              :page-size="pageData.pageSize"
              layout="prev, pager, next"
              :total="pageData.totalCount"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { resolve } from "q";
export default {
  props: ["path", "approutecode", "objectid", "objectname"],
  name: "readcomment",
  data() {
    return {
      value: 2.5,
      value1: 0,
      fileUrl: window.localStorage.getItem("fileUrl"), //图片地址前缀
      ////
      ReaderCommentConfig: {}, //读者评论 配置 数据
      ReaderCommentList: {}, // 全部评论 列表 数据 分页
      MyCommentList: {}, // 我的评论 列表 数据
      CommentSensitiveWords: "",
      ////
      editor: "",
      myCommentData: "",
      ///
      commentsDialogShow: false, //更多评论 弹窗 开关
      commentsDlgData: {}, //更多评论 弹窗 内容数据
      pageSizes: [10, 20, 50, 100, 150, 200],
      currentComId: "",
      pageData: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 20
      },
      allComPageData: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 20
      },
      size: "",
      //
      editor_reply: "",
      othComReply: {
        othComReplyShow: false
      },
      editor_reply_data: "",
      ////
      // mybaseUrl: "http://192.168.21.192:8402",
      denglutype: "",
      mybaseUrl: "/readercomment",
      mybaseApi: "/api/ReaderCommentWeb/",
      mytoken: ""
    };
  },
  created() {
    console.log(this.path, this.approutecode, this.objectid);
    // var s = location.hash;
    // this.path = s.substr(1);
    // console.log(this.path);
    this.denglutype = localStorage.getItem("token");
    if (!localStorage.getItem("token")) {
      this.mytoken = localStorage.getItem("BasicToken");
    } else {
      this.mytoken = localStorage.getItem("token");
    }
  },
  mounted() {
    // console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      this.GetMyCommentForObjectList(); //获取我自己评论的列表
      this.GetMyScore(); //根据id,获取我的评分
    }
    this.createEdit();
    // console.log(localStorage.getItem("BasicToken"));
    this.GetReaderCommentConfig(); //获取评论配置(isOn和isCanComment同时为true表示可发表评论)
    // this.AddReaderComment(); //添加评论
    // this.AddCommentReply()//添加评论的回复
    this.GetReaderCommentList(); //全部评论列表
    this.GetCommentSensitiveWords();//铭感词
  },
  methods: {
    GetCommentSensitiveWords() {
      let url = `${this.mybaseUrl}${this.mybaseApi}GetCommentSensitiveWords`;
      this.mygethttp(url).then(data => {
        this.CommentSensitiveWords = Object.freeze(data.data.sensitiveWords);
        // console.log("铭感词", this.CommentSensitiveWords);
      });
    },
    //打开 查看更多回复 弹窗
    showcommentsDialog(item) {
      // console.log(item);
      this.commentsDlgData = item;
      this.GetCommentReplyList(item.id, this.pageData);
      this.currentComId = item.id;
      console.log("当前主评论的回复", this.commentsDlgData);
      setTimeout(() => {
        this.commentsDialogShow = !this.commentsDialogShow;
      }, 100);
    },
    //关闭 查看更多回复 弹窗
    commentDialogClose(e) {
      // console.log(e);
      this.commentsDlgData = {};
      this.commentsDialogShow = !this.commentsDialogShow;
    },
    ////////////////////////////////////////////////////////
    //获取评论配置(isOn和isCanComment同时为true表示可发表评论)
    GetReaderCommentConfig() {
      //参数：approutecode (news)  columnid (DHVvI6KsZy^DDa3U)
      let url = `${this.mybaseUrl}${this.mybaseApi}GetReaderCommentConfig`;
      let data = {
        approutecode: this.approutecode,
        columnid: "DHVvI6KsZy^DDa3U"
      };
      this.mygethttp(url, data).then(data => {
        this.ReaderCommentConfig = data.data;
        this.$emit("comMainSwitch", this.ReaderCommentConfig.isOn);
        console.log("评论配置", this.ReaderCommentConfig);
      });
    },
    //根据id,获取我的评分
    GetMyScore() {
      let url = `${this.mybaseUrl}${this.mybaseApi}GetMyScore`;
      let data = {
        approutecode: this.approutecode,
        id: this.objectid
      };
      this.mygethttp(url, data).then(data => {
        // console.log(data);
      });
    },
    //添加评论 / 评分
    AddReaderComment(data, type) {
      let url = `${this.mybaseUrl}${this.mybaseApi}AddReaderComment`;
      this.myposthttp(url, data).then(data => {
        // console.log(data);
        if (data.data) {
          this.$message({ type: "success", message: `发表${type}成功！` });
          this.GetMyCommentForObjectList();
          this.myCommentData = "";
          this.editor.txt.clear();
        } else {
          this.$message({
            type: "error",
            message: `发表${type}失败！${data.errors}`
          });
          this.GetMyCommentForObjectList();
        }
      });
    },
    // 单击 发表 提交评论
    pubMyComment() {
      if (!this.denglutype) {
        console.log("未登录");
      } else {
        if (this.myCommentData == "") {
          this.$message({ type: "warning", message: "评论内容不能为空!" });
        } else {
          // console.log(this.trip_html(this.myCommentData));
          if (
            this.CommentSensitiveWords.indexOf(
              this.trip_html(this.myCommentData)
            ) > -1
          ) {
            this.$message({
              type: "error",
              message: `您的输入包含敏感信息，请规范输入！`
            });
          } else {
            let data = {
              approutecode: this.approutecode,
              objectid: this.objectid,
              objectname: "测试翻页内容99999",
              type: 2,
              score: 0,
              content: this.myCommentData,
              articleTypes: "",
              columnId: "DHVvI6KsZy^DDa3U",
              targetUrl: this.path
            };
            this.AddReaderComment(data, "评论");
          }
        }
      }
    },
    //获得纯净文字
    trip_html(html) {
      var tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      var html = tmp.textContent || tmp.innerText;
      html = html.replace(/(?:(\r\n)+|\r + |\n+)/g, "<br>");
      return html;
    },

    // 提交评分
    myScore(e) {
      let data = {
        approutecode: this.approutecode,
        objectid: this.objectid,
        objectname: "测试翻页内容99999",
        type: 1,
        score: e,
        content: "",
        articleTypes: "",
        columnId: "DHVvI6KsZy^DDa3U",
        targetUrl: this.path
      };
      // let fn = this.throttle(this.AddReaderComment(), 1500, data);
      // fn;
      this.AddReaderComment(data, "评分");
    },
    //删除 评分
    deleteMyScore() {
      // this.MyCommentList.myScore = 0;
      let url = `${this.mybaseUrl}${this.mybaseApi}DeleteMyScore`;
      let data = {
        approutecode: this.approutecode,
        id: this.objectid
      };
      axios({
        url: url,
        method: "DELETE",
        params: data,
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
          Authorization: "Bearer " + this.mytoken
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.data.data) {
            this.$message({ type: "success", message: `删除评分成功！` });
            this.GetMyCommentForObjectList();
          }
        })
        .catch(err => {
          // console.log(err);
        });
    },
    //删除评论
    DeleteMyReaderComment(commentId) {
      let url = `${this.mybaseUrl}${this.mybaseApi}DeleteMyReaderComment`;
      let data = { id: commentId };
      this.mypostqueryhttp(url, data).then(data => {
        console.log(data);
        if (data.data) {
          this.$message({ type: "success", message: "删除评论成功！" });
          this.GetMyCommentForObjectList();
        } else {
          this.$message({
            type: "error",
            message: `删除评论失败！${data.errors}`
          });
        }
      });
    },
    //点击删除评论
    delMyComment(item) {
      console.log(item);
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.DeleteMyReaderComment(item.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //添加评论的回复
    AddCommentReply(data) {
      let url = `${this.mybaseUrl}${this.mybaseApi}AddCommentReply`;
      this.myposthttp(url, data).then(data => {
        console.log(data);
        if (data.data) {
          this.$message({ type: "success", message: "回复评论成功！" });
          this.editor_reply.txt.clear();
          this.editor_reply_data = "";
          this.GetReaderCommentList();
        } else {
          this.editor_reply.txt.clear();
          this.editor_reply_data = "";
        }
      });
    },
    //全部评论列表
    GetReaderCommentList() {
      let url = `${this.mybaseUrl}${this.mybaseApi}GetReaderCommentList`;
      // let data = {
      //   approutecode: "news",
      //   id: "ED9iT6KsaHQyfUY",
      //   pageindex: 1,
      //   pagesize: 10,
      //   isgetstaticdata: true
      // };
      let data = {
        approutecode: this.approutecode,
        id: this.objectid,
        pageindex: this.allComPageData.pageIndex,
        pagesize: this.allComPageData.pageSize,
        isgetstaticdata: true
      };
      this.mygethttp(url, data).then(data => {
        this.ReaderCommentList = data.data;
        this.ReaderCommentList.items.forEach(val => {
          this.$set(val, "othComReplyShow", false);
        });
        this.allComPageData.totalCount = this.ReaderCommentList.total;
        this.allComPageData.pageIndex = this.ReaderCommentList.pageindex;
        this.allComPageData.pageSize = this.ReaderCommentList.pagesize;
        console.log("全部评论列表", this.ReaderCommentList);
      });
    },
    handleCurrentChange1(val) {
      // console.log(val);
      this.allComPageData.pageIndex = val;
      this.GetReaderCommentList();
    },
    //评论的回复列表
    GetCommentReplyList(targetId, pagedata) {
      let url = `${this.mybaseUrl}${this.mybaseApi}GetCommentReplyList`;
      let data = {
        approutecode: this.approutecode,
        targetId: targetId,
        pageindex: pagedata.pageIndex,
        pagesize: pagedata.pageSize
      };
      this.mygethttp(url, data).then(data => {
        console.log(data);
        this.commentsDlgData.data = data.data;
        this.pageData.pageIndex = data.data.pageindex;
        this.pageData.pageSize = data.data.pagesize;
        this.pageData.totalCount = data.data.total;
      });
    },
    handleCurrentChange(val) {
      let pagedata = {
        pageIndex: val,
        pageSize: 10
      };
      this.GetCommentReplyList(this.currentComId, pagedata);
    },
    //获取内容下我的评论列表
    GetMyCommentForObjectList() {
      let url = `${this.mybaseUrl}${this.mybaseApi}GetMyCommentForObjectList`;
      let data = { id: this.objectid, approutecode: this.approutecode };
      this.mygethttp(url, data).then(data => {
        // console.log(data);
        this.MyCommentList = data.data;
        console.log("我的评论列表", this.MyCommentList);
        setTimeout(() => {
          if (this.MyCommentList.myScore != 0) {
            this.ReaderCommentList.overallRating_Out = parseFloat(
              (
                (this.ReaderCommentList.overallRating_Out *
                  this.ReaderCommentList.scoreCount_Out +
                  this.MyCommentList.myScore) /
                (this.ReaderCommentList.scoreCount_Out + 1)
              ).toFixed(1)
            );
          } else {
            this.GetReaderCommentList();
          }
        }, 100);
      });
      // this.http
      //   .getJson("Get-MyCommentForObjectList", data)
      //   .then(res => {
      //     console.log(res);
      //     // this.articleTypes = res.data.articleTypes;
      //     // this.navigations = res.data.navigations;
      //     // this.commentShowField = res.data.commentShowField;
      //   })
      //   .catch(err => {
      //     this.$message({ type: "error", message: "获取数据失败!" });
      //     resolve();
      //   });
    },
    //点赞评论
    LikeComment(val) {
      console.log(val);
      let url = `${this.mybaseUrl}${this.mybaseApi}LikeComment`;
      let data = {
        approutecode: this.approutecode,
        // approutecode: 'news',
        id: val.id
      };
      this.mypostqueryhttp(url, data).then(data => {
        // console.log(data);
        if (data.data) {
          this.GetReaderCommentList();
        } else {
        }
      });
    },
    // http请求封装
    myposthttp(url, data) {
      return new Promise(resolve => {
        axios({
          url: url,
          method: "POST",
          data: data,
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            Authorization: "Bearer " + this.mytoken
          }
        })
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            // console.log(err);
          });
      });
    },
    mypostqueryhttp(url, data) {
      return new Promise(resolve => {
        axios({
          url: url,
          method: "POST",
          params: data,
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            Authorization: "Bearer " + this.mytoken
          }
        })
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            // console.log(err);
          });
      });
    },
    mygethttp(url, data) {
      return new Promise(resolve => {
        axios({
          url: url,
          method: "GET",
          params: data,
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            Authorization: "Bearer " + this.mytoken
          }
        })
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            // console.log(err);
          });
      });
    },
    throttle(fn, delay) {
      let timeout;
      return function() {
        let args = arguments; //注意如果要传参的话 这句不能省略
        console.log(args);
        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null;
            fn.apply(this, args);
          }, delay);
        }
      };
    },
    //打开 回复 富文本框
    othComReplyShowFn(item, index) {
      // console.log(item, index);
      item.othComReplyShow = !item.othComReplyShow;

      setTimeout(() => {
        var E_R = window.wangEditor;
        var dc = document.getElementById("wangEditorR");
        this.editor_reply = new E_R(dc);
        this.editor_reply.config.showFullScreen = false; //去除全屏按钮
        this.editor_reply.config.menus = ["emoticon"]; //选择需要展示的按钮
        this.editor_reply.create();
        this.editor_reply.config.onchange = html => {
          this.editor_reply_data = this.editor_reply.txt.html();
        };
      }, 100);
    },
    weReply(item) {
      console.log(item, this.editor_reply_data);
      if (
        this.CommentSensitiveWords.indexOf(
          this.trip_html(this.editor_reply_data)
        ) > -1
      ) {
        this.$message({
          type: "error",
          message: `您的输入包含敏感信息，请规范输入！`
        });
      } else {
        let data = {
          approutecode: this.approutecode,
          objectid: this.objectid,
          objectname: "测试翻页内容99999",
          score: 3,
          content: this.editor_reply_data,
          articleTypes: "",
          columnId: "DHVvI6KsZy^DDa3U",
          targetUrl: this.path,
          replyTo: item.userName,
          replyTarget: item.id
        };
        this.AddCommentReply(data);
      }
    },

    createEdit() {
      setTimeout(() => {
        if (
          this.ReaderCommentConfig.isOn &&
          this.ReaderCommentConfig.isCanComment &&
          (this.ReaderCommentConfig.type == 2 ||
            this.ReaderCommentConfig.type == 3)
        ) {
          var E = window.wangEditor;
          this.editor = new E(document.getElementById("wangEditor"));
          // 创建编辑器
          this.editor.config.showFullScreen = false; //去除全屏按钮
          this.editor.config.menus = [
            "bold",
            "italic",
            "underline",
            "emoticon"
          ]; //选择需要展示的按钮
          this.editor.create();

          this.editor.config.onchange = html => {
            // $("#text1").val(editor.txt.html());
            this.myCommentData = this.editor.txt.html();
            // console.log(editor.txt.html());
            // document.getElementById("text").innerHTML = editor.txt.html();
          };
        }
      }, 100);
    },
    SizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // this.pagedata.pageSize = val;
      this.$emit("pagechange", { key: "pageSize", value: val });
    },
    CurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagedata.pageIndex = val;
      this.$emit("pagechange", { key: "pageIndex", value: val });
    }
    ////////////////////////////////////////////////////////
  }
};
</script>
<style>
.readComment {
  background-color: #f6f8f9;
  padding: 0px;
  border-radius: 5px;
  margin-bottom: 30px;
}
.readerComments {
  width: 100%;
  background: #fff;
  border-radius: 5px 5px 0 0;
  height: 50px;
  position: relative;
  font-size: 16px;
  font-weight: 700;
  line-height: 50px;
  color: #333;
  padding-left: 20px;
  display: flex;
  align-items: center;
}
.readerComments::before {
  content: "";
  position: absolute;
  width: 3px;
  height: 20px;
  background: #a00404;
  left: -10px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.readerComments img {
  margin-right: 12px;
  width: 20px;
  height: 20px;
}
.over-globalScoring {
  display: flex;
}
.globalScoring {
  margin-top: 10px;
  /* display: inline-block; */
  height: 50px;
  background: #fff;
  border-radius: 5px 5px 0 0;
  position: relative;
  font-size: 16px;
  line-height: 50px;
  color: #333;
  padding-left: 20px;
  display: flex;
  align-items: center;
}
.globalScoring .globalScoringTxt {
  margin-right: 12px;
}
.globalScoring .fengexian {
  margin-left: 12px;
  margin-right: 12px;
  color: #555;
}
.globalScoring .scoringCount {
  font-size: 12px;
  color: #555;
  margin-right: 12px;
}
.globalScoring .el-rate__item {
  margin-right: 0;
}
.globalScoring .el-rate__item i {
  font-size: 28px;
  margin-right: 0;
}
.globalScoring .el-rate__text {
  margin-left: 5px;
}
.globalScoring .el-rate {
  height: 28px;
  /* width: 200px; */
}
/*  */
.commentBox {
  margin-top: 10px;
  position: relative;
  /* min-height: 126px; */
}
.commentBox .w-e-toolbar {
  border: none !important;
  border-radius: 5px 5px 0 0;
  height: 30px !important;
  z-index: 1 !important;
}
.commentBox .w-e-text-container {
  padding-right: 110px;
  border: none !important;
  height: 80px !important; /*!important是重点，因为原div是行内样式设置的高度300px*/
  z-index: 1 !important;
}
.commentBox .w-e-menu {
  width: 30px !important;
  height: 30px !important;
}
.commentBox .pubComment {
  position: absolute;
  bottom: 25px;
  right: 10px;
  z-index: 2;
  width: 110px;
  justify-content: center;

  cursor: pointer;
  color: #fff;
  font-weight: 400;
  border: none;
  border-radius: 6px;
  outline: none;
  vertical-align: middle;
  opacity: 1;
  transition: all 0.3s;
}
.myComScore .hr {
  margin-top: 7px;
  height: 1px;
  background: #e3e5e7;
}
/*  */
.readComment .myComScore {
  margin-top: 10px;
  height: 24px;
  font-size: 16px;
  line-height: 24px;
  color: #333;
}
.myComScore .myScore {
  margin-right: 12px;
}
.myComScore .el-rate__item {
  margin-right: 0;
}
.myComScore .el-rate__item i {
  font-size: 22px;
  margin-right: 0;
}
.myComScore .el-rate__text {
  margin-left: 5px;
}
.myComScore .el-rate {
  height: 22px;
  /* width: 200px; */
}
.myComScore .div1 {
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.myComScore .delComment {
  margin-left: 12px;
  cursor: pointer;
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  border: none;
  border-radius: 12px;
  outline: none;
  vertical-align: middle;
  opacity: 1;
  transition: all 0.5s ease-in;
  padding: 5px;
}
/* .myComScore .hr {
  margin: 15px 0;
  height: 1px;
  background: #a0a0a0 !important;
} */
/*  */
.myComments {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 20px;
}
.myComments .myCommentTit {
  margin-left: 20px;
  margin-right: 12px;
  /* height: 50px; */
  font-size: 16px;
  /* line-height: 50px; */
  color: #333;
  flex-grow: 0;
}
.myComments .commentsContent {
  background: #fff;
  border: 1px solid #e3e5e7;
  border-radius: 8px;
  flex-grow: 1;
  padding: 0 20px;
}
.myComments .commentsContent .commentsContent-item {
  padding: 15px 0;
  display: flex;
}
.myComments .commentsContent hr {
  background-color: #e8e8e8;
  height: 1px;
  border: none;
}
.myComments .commentsContent .commentsContent-item .commentTime {
  margin-right: 30px;
  font-size: 14px;
  color: #999;
}
.myComments .commentsContent .commentsContent-item .item-content {
  flex-grow: 1;
}
.myComments .commentsContent .commentsContent-item .item-info {
  padding: 0 0 10px 0;
}
.myComments .commentsContent .commentsContent-item .zanAhuifu {
  display: flex;
  align-items: flex-start;
  flex-grow: 0;
}
.myComments .commentsContent .commentsContent-item .zanAhuifu :nth-child(2) {
  margin-right: 20px;
}
.myComments .commentsContent .commentsContent-item .zanAhuifu span {
  color: #bfbfbf;
  margin-left: 5px;
}
.allComments {
  background-color: #f6f8f9;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 30px;
}
.allComments .title {
  margin-bottom: 10px;
}
.allComments .title span {
  height: 30px;
  position: relative;
  font-size: 16px;
  font-weight: 700;
  line-height: 30px;
  color: #333;
  padding-left: 20px;
}
.allComments .title .commentsCouts {
  margin-left: 10px;
  border: none;
  cursor: none;
  border-radius: 10px;
  background: #e3e4e4;
  padding: 3px 4px;
  font-size: 13px;
  color: #333;
}
.allComments .main-comments {
  background: #fff;
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}
.allComments .main-comments .touxiang img {
  width: 50px;
  height: 50px;
  border-radius: 25px;
}
.allComments .main-comments .touxiang {
  flex-grow: 0;
  padding: 10px;
}
.allComments .main-comments .section-comments {
  width: 80%;
  flex-grow: 1;
  padding: 10px;
}
.allComments .main-comments .section-comments .comments-info {
  display: flex;
  align-items: flex-start;
  /* margin-bottom: 20px; */
  padding: 5px 0;
}
.allComments .main-comments .section-comments .comments-info .commentTime {
  font-size: 12px;
  color: #555;
}
.allComments .main-comments .section-comments .comments-info .nameTime {
  margin-bottom: 10px;
}
.allComments .main-comments .section-comments .comments-info :nth-child(1) {
  flex-grow: 1;
}
.allComments .main-comments .section-comments .comments-info .zanAhuifu {
  display: flex;
  align-items: center;
}
.allComments
  .main-comments
  .section-comments
  .comments-info
  .zanAhuifu
  :nth-child(2) {
  margin-right: 20px;
}
.allComments .main-comments .section-comments .comments-info .zanAhuifu span {
  color: #bfbfbf;
  margin-left: 5px;
}
.allComments .main-comments .section-comments .comments-reply {
  background: #f6f8fa;
  border-radius: 8px;
  padding: 15px;
}
.allComments .main-comments .section-comments .textarea-reply {
  padding: 10px 2px;
  position: relative;
  transition: all 0.5s;
}

.allComments .main-comments .section-comments .textarea-reply .w-e-toolbar {
  border: none !important;
  border-radius: 5px 5px 0 0;
  height: 0px !important;
}
.allComments
  .main-comments
  .section-comments
  .textarea-reply
  .w-e-text-container {
  border: none !important;
  height: 80px !important; /*!important是重点，因为原div是行内样式设置的高度300px*/
}
.allComments .main-comments .section-comments .textarea-reply .w-e-menu {
  /* width: 30px !important;
  height: 30px !important; */
  font-size: 25px !important;
  position: absolute;
  top: 4px;
  right: 70px;
}
.allComments
  .main-comments
  .section-comments
  .textarea-reply
  .w-e-text-container {
  height: auto !important;
  padding-right: 100px;
  border: 1px solid #bfbfbf !important;
  border-radius: 5px;
}
.allComments .main-comments .section-comments .textarea-reply input {
  width: 100%;
  height: 40px;
  padding-left: 10px;
  padding-right: 70px;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
}
.allComments .main-comments .section-comments .textarea-reply button {
  position: absolute;
  z-index: 10000;
  height: 30px;
  padding: 0px 15px;
  top: 18px;
  right: 10px;
  border: none;
  border-radius: 5px;
}
.comments-reply .comReply-item {
  display: flex;
  align-items: flex-start;
  padding: 10px 0;
}
.comments-reply .comReply-item .touxiang {
  flex-grow: 0;
  padding: 0;
}
.comments-reply .comReply-item .touxiang img {
  width: 50px;
  height: 50px;
  border-radius: 25px;
}
.comments-reply .comReply-item .comReply-content {
  flex-grow: 1;
}
.comments-reply .comReply-item .zanAhuifu {
  flex-grow: 0;
  display: flex;
  align-items: center;
}
.comments-reply .comReply-item .zanAhuifu :nth-child(2) {
  margin-right: 20px;
}
.comments-reply .comReply-item .zanAhuifu span {
  color: #bfbfbf;
  margin-left: 5px;
}
.comments-reply .comReply-item .comReply-content {
  padding: 0 20px;
}
.comReply-content .zhudong,
.comReply-content .beidong {
  margin-right: 10px;
  font-size: 14px;
}
.comReply-content .huifu {
  color: #999;
  margin-right: 10px;
}
.comReply-content .time {
  color: #999;
  margin-right: 10px;
  font-size: 12px;
}
.comments-reply hr {
  background-color: #d4d4d4;
  height: 1px;
  border: none;
  margin-bottom: 10px;
}
.comments-reply .seemore {
  margin-left: 20px;
}
.comments-reply .comReply-item .reply-info {
  margin-top: 10px;
}
/*  */
.commentsDialog {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20010;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease-in;
}
.commentsDialog .commentsDialog-body {
  position: absolute;
  top: -20px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 820px;
  height: 85vh;
  border-radius: 6px;
  background: #fff;
}
.commentsDialog .commentsDialog-body .commentsDialog-header {
  padding: 15px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.commentsDialog .commentsDialog-body .commentsDialog-header span {
  font-weight: 600;
  color: #444;
}
.commentsDialog .commentsDialog-body .commentsDialog-header i {
  font-weight: 600;
  font-size: 16px;
  color: #444;
}
.commentsDialog .commentsDialog-body hr {
  background-color: #f0f0f0;
  height: 2px;
  border: none;
  /* border-width: 2px; */
}
.commentsDialog-content {
  padding: 10px;
  height: calc(85vh - 52px - 30px);
  overflow-y: auto;
}
.commentsDialog-content .replys,
.commentsDialog-content .comments {
  display: flex;
  align-items: flex-start;
  padding: 10px 30px 10px 10px;
}
.commentsDialog-content .replys .touxiang,
.commentsDialog-content .comments .touxiang {
  flex-grow: 0;
  padding: 0;
}
.commentsDialog-content .replys .comment-content,
.commentsDialog-content .comments .comment-content {
  margin-left: 20px;
  margin-right: 20px;
  flex-grow: 1;
}
.commentsDialog-content .replys .comment-content .zhudong,
.commentsDialog-content .replys .comment-content .beidong,
.commentsDialog-content .comments .comment-content .zhudong,
.commentsDialog-content .comments .comment-content .beidong {
  margin-right: 10px;
}
.commentsDialog-content .replys .comment-content .huifu,
.commentsDialog-content .replys .comment-content .time,
.commentsDialog-content .comments .comment-content .huifu,
.commentsDialog-content .comments .comment-content .time {
  font-size: 14px;
  color: #999;
  margin-right: 10px;
}
.commentsDialog-content .replys .touxiang img,
.commentsDialog-content .comments .touxiang img {
  width: 50px;
  height: 50px;
  border-radius: 25px;
}
.commentsDialog-content .replys .zanAhuifu,
.commentsDialog-content .comments .zanAhuifu {
  display: flex;
  align-items: center;
}
.commentsDialog-content .replys .zanAhuifu :nth-child(2),
.commentsDialog-content .comments .zanAhuifu :nth-child(2) {
  margin-right: 20px;
}
.commentsDialog-content .replys .zanAhuifu span,
.commentsDialog-content .comments .zanAhuifu span {
  color: #bfbfbf;
  margin-left: 5px;
}
.commentsDialog-content .reply-count {
  padding: 6px 20px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  width: fit-content;
  margin-left: -9px;
  margin-bottom: 10px;
}
.commentsDialog-content .reply-count :nth-child(2) {
  color: #333;
}
.reply-main hr {
  background-color: #f0f0f0;
  height: 1px !important;
  width: 97%;
  border: none;
}
.commentsDialog-footer {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: none;
}
/* .commentsDialog-footer i {
  font-size: 18px;
  cursor: pointer;
}
.commentsDialog-footer span {
  display: inline-block;
  line-height: 18px;
  font-size: 18px;
  text-align: center;
  width: 18px;
  height: 18px;
  cursor: pointer;
} */
/* .commentsDialog-footer .is-active {
  background: #333;
  color: #fff;
  border-radius: 4px;
} */
/* 


==============================================================================


*/
pre {
  font-family: Verdana, Arial, "Microsoft YaHei", helvetica, Sans-serif;
  font-size: 15px;
  line-height: 24px;
  color: #444;
}
.globalScore,
.globalComment {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 10px;
}
.pubComment,
.myComment,
/* .globalCommentInfo, */
.globalCommentInfo .comPeople {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 10px 10px;
}

.myComment .commentHandle,
.globalComment .commentHandle,
.globalCommentInfo .comPeople .commentHandle {
  position: absolute;
  top: 10px;
  right: 10px;
}
.globalCommentInfo img {
  width: 40px;
  height: 40px;
  border-radius: 57px;
  margin-right: 20px;
}

.title {
  font-size: 14px;
  color: #333333;
  margin-right: 15px;
}
.publish {
  margin-left: 10px;
}
.readComment .scoreCount {
  margin-left: 10px;
  color: #555555;
  font-size: 12px;
}
/* .myComScore .el-rate__item,
.globalScore .el-rate__item {
  margin-right: 0;
}
.myComScore .el-rate__item i,
.globalScore .el-rate__item i {
  font-size: 30px;
  margin-right: 0;
}
.myComScore .el-rate,
.globalScore .el-rate {
  height: 30px;
} */

.othersName,
.othersComTime {
  color: #999 !important;
  font-size: 12px;
}
.othersComTime {
  margin-left: 20px;
}
.othersComHeader {
  margin-bottom: 10px;
}
.dateAndDelete {
  display: flex;
  align-items: center;
}
.myComDate {
  font-size: 12px;
  color: #aaa;
}
.deleteMyCom {
  margin-left: 40px;
  font-size: 13px;
}
.comCount {
  font-size: 12px;
  color: #7f7f7f;
}
.replyPeople {
  padding: 20px 60px;
  position: relative;
  display: flex;
  align-items: flex-start;
}
.replyPeople .commentHandle {
  position: absolute;
  display: flex;
  align-items: center;
  top: 20px;
  right: 80px;
}
.seeMore {
  display: flex;
  flex-direction: column;
  align-items: center;
}
i {
  font-style: italic;
}
</style>
