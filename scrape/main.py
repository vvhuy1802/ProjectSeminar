from bs4 import BeautifulSoup
import requests
import time
# URL to scrape
url = "https://www.timesjobs.com/candidate/job-search.html?searchType=personalizedSearch&from=submit&txtKeywords=react+native&txtLocation="

# Get the HTML content
def find_jobs():
    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, 'lxml')
    jobs = soup.find_all('li', class_ ='clearfix job-bx wht-shd-bx')
    arrJobs = []

    # Loop through the jobs
    for index, job in enumerate(jobs):
        published_date = job.find('span', class_ = 'sim-posted').text.strip()
        if('few' in published_date):
            company_name = job.find('h3', class_ = 'joblist-comp-name').text.strip()
            skills = job.find('span', class_ = 'srp-skills').text.strip().replace(' ', '').replace(',',', ')
            more_info = job.header.h2.a['href']

            arrJobs.append([
                'Company: ' + company_name,
                'Required Skills: ' + skills,
                'More Info: ' + more_info,
                'Published Date: ' + published_date,
                "Created at: " + time.ctime()
            ])
    
    if(len(arrJobs) > 0):
        with open(f'posts/jobs.txt','w') as f:
            f.write(f"Total Jobs Found: {len(arrJobs)} \n")
            f.write(f"{'-' * 20} \n")
            for job in arrJobs:
                f.write(f"{job[0]} \n")
                f.write(f"{job[1]} \n")
                f.write(f"{job[2]} \n")
                f.write(f"{job[3]} \n")
                f.write(f"{job[4]} \n")
                f.write(f"{'-' * 50} \n")
    else:
        print('No new jobs found.')

if __name__ == '__main__':
    while True:
        find_jobs()
        time_wait = 10
        print(f"Waiting {time_wait} minutes...")
        time.sleep(time_wait * 60)