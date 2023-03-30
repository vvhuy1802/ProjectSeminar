from bs4 import BeautifulSoup
import requests
from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from firebase_admin import credentials
from firebase_admin import firestore,firestore_async
import firebase_admin
from time import sleep

credpath = 'scrape/web-scraping-67540-firebase-adminsdk-5qm46-d1a7fa09d5.json'

#initialize firebase

firebase_admin.initialize_app(credentials.Certificate(credpath))

db=firestore.client()


# Add a new doc in collection 'cities' with ID 'LA'


def Find_Job_In_ITVIEC(search_key):
    driver = webdriver.Chrome()
    urlmain="https://itviec.com/"
    url="https://itviec.com/sign_in"
    driver.get(url)

    credential=open("login_credential.txt")
    line = credential.readlines()
    email = line[0]
    password=line[1]

    email_field=driver.find_element(By.ID,"user_email")
    email_field.send_keys(email)

    password_field=driver.find_element(By.ID,"user_password")
    password_field.send_keys(password)

    login_button=driver.find_element(By.XPATH,"/html/body/div[2]/div[3]/div/div[2]/form/div[4]/div/button")
    login_button.click()

    sleep(3)

    button_close=driver.find_element(By.XPATH,"/html/body/div[3]/div/div/div/button")
    button_close.click()

    sleep(1)

    while True:
     btn_check = driver.find_elements(By.XPATH,"/html/body/div[2]/div[3]/div/div[2]/form/div[3]/div/div/div")
    
     if len(btn_check) > 0:
        print("Đã tìm thấy phần tử Tôi không phải là robot!")
        # Đóng trình duyệt
        driver.quit()
        # Khởi tạo lại trình duyệt
        driver = webdriver.Chrome()
        driver.get(url)
        credential=open("login_credential.txt")
        line = credential.readlines()
        email = line[0]
        password=line[1]

        email_field=driver.find_element(By.ID,"user_email")
        email_field.send_keys(email)

        password_field=driver.find_element(By.ID,"user_password")
        password_field.send_keys(password)

        login_button=driver.find_element(By.XPATH,"/html/body/div[2]/div[3]/div/div[2]/form/div[4]/div/button")
        login_button.click()

        sleep(3)

        button_close=driver.find_element(By.XPATH,"/html/body/div[3]/div/div/div/button")
        button_close.click()

     else:
        # Thoát vòng lặp và tiếp tục đăng nhập vào ITviec
        break
    sleep(2)
    button_setlocation=driver.find_element(By.XPATH,"/html/body/div[2]/div[3]/div/form/div[1]/div/div")
    button_setlocation.click()

    sleep(1)

    set_all_city=driver.find_element(By.XPATH,"/html/body/div[2]/div[3]/div/form/div[1]/div/div/div[2]/div/div[1]")
    set_all_city.click()

    search_field=driver.find_element(By.XPATH,"/html/body/div[2]/div[3]/div/form/div[2]/div/input")
    #search=input("Enter your job: ")
    search_field.send_keys(search_key)
    search_field.send_keys(Keys.RETURN)

    urlsearch=driver.current_url # lấy URL mới sau khi đăng nhập thành công
    driver.get(urlsearch) # mở URL mới
    html_text=driver.page_source # lấy mã HTML trang web hiện tại
    soup=BeautifulSoup(html_text,'lxml')

    jobs = soup.find_all('div',class_='job_content')
    total_data=[]

    for job in jobs:
     imagejob = job.find('div',class_='logo-wrapper job-details-link-wrapper')
     image = imagejob.find('img')
     src = image['data-src']
     get_location=job.find('div',class_='address')
     location=get_location.find('div',class_="text").text
     namejob=job.find('h3',class_='title job-details-link-wrapper')
     name=namejob.find('a').text
     salary=job.find('div',class_='svg-icon__text').text
     link_job=urlmain+namejob.find('a').get('href')
     driver.get(link_job)
    # lưu lại data ở trang mới
     html_new_page=driver.page_source # lấy mã HTML trang web hiện tại
     bt_soup=BeautifulSoup(html_new_page,'lxml')
     detail_job=bt_soup.find('div',class_='job-details')
     get_require=detail_job.find_all('a',class_='big ilabel mkt-track')
     require=[]
     for i in range(0,len(get_require)):
        require.append(get_require[i].find('span').text.strip())
     title=detail_job.find_all('h2',class_='job-details__second-title')
     content_one=detail_job.find('div',class_='job-details__top-reason-to-join-us')
     content=detail_job.find_all('div',class_='job-details__paragraph')
     company=bt_soup.find('div',class_="jd-page__employer-overview")
     company_find=company.find('h3',class_="employer-long-overview__name hidden-xs d-none d-sm-block")
     company_name=company_find.find('a').text
     link_company=urlmain+company_find.find('a').get('href')
     all_title=[]
     all_content=[]
     for i in range(0,len(title)):
        get_content=""
        if(i==0):
            get_title=title[i].text
            all_title.append(get_title)
            if content_one is None:
              print("Không tìm thấy li nào!")
            else:
             for j in range(0,3):
              get_content+=content_one.find_all('li')[j].text+"| "
            new_content = get_content.replace("\xa0", "").replace("\n", "")
            all_content.append(new_content)
        else:
            get_title=title[i].text
            all_title.append(get_title)
            find=content[i-1].find_all('li')
            for k in range(0,len(find)):
                get_content+=find[k].text+"| "
            new_content = get_content.replace("\xa0", "").replace("\n", "")
            all_content.append(new_content)
     sleep(5)
    # trở về trang đầu tiên để lặp tiếp
     print(all_content)
     data = {
    "description":
        {
            "title": all_title,
            "content": all_content
        },

    "image": src,
    "job_name": name,
    "web_name":"ITViec",
    "salary": salary,
    "company_name": company_name,
    "link_job": link_job,
    "link_company": link_company,
    "tag":"ReactJs",
    "location": location,
    "require": require
    }
     total_data.append(data)
     driver.back()
    data_total = {
    "ReactJs": total_data
    }
    db.collection("Totals").document(search_key).set(data_total)
def Find_Jobs_In_TopCV():
    url = "https://www.topcv.vn/"
    search = input("Enter your job: ")
    search = search.strip().replace(" ", "-")
    options = webdriver.ChromeOptions()
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    driver = webdriver.Chrome(options=options)

    url = url + "tim-viec-lam-"+search+"?page=1"

    driver.get(url)

    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, 'lxml')

    jobs = soup.find_all('div', class_='job-item-default job-ta')
    jobs_highlight = soup.find_all(
        'div', class_='job-item-default bg-highlight job-ta')

    if (len(jobs) > 0):
        linkJob = jobs[0].find('a').get('href')
        companyJob = jobs[0].find('a', class_='company').text
        print(f'- Link: {linkJob} \n- Company: {companyJob}')
    if (len(jobs_highlight) > 0):
        linkJob_highlight = jobs_highlight[0].find('a').get('href')
        companyJob_highlight = jobs_highlight[0].find(
            'a', class_='company').text
        print(
            f'- Link: {linkJob_highlight} \n- Company: {companyJob_highlight}')


if __name__ == '__main__':
    a=["ReactJs","React Native","PHP","NodeJs","Python","Angular","VueJs","Java","C#","C++","C","Ruby","Go","Swift","Kotlin","Flutter"]
    i=0
    while True:
        while a.__len__()>0:
            Find_Job_In_ITVIEC(a[0])
            a.pop(i)
            i+=1
        time_wait = 1
        print(f"Waiting {time_wait} minutes...")
        time.sleep(time_wait * 6000)
        pass

